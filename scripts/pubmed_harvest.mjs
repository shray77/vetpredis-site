#!/usr/bin/env node
/* pubmed_harvest.mjs — Task 233: скелет PubMed-харвестера атласа VetPredisp.
   Роадмап-пункт 1 из README: по каждой породе из data.js строит E-utilities
   запрос `"<breed>" AND (predisposition OR prevalence OR risk)`, тянет аннотации
   (esearch → esummary) и складывает кандидатов в JSON для ручной курации.

   Только встроенный fetch (Node ≥ 18), без зависимостей и без ключей
   (public rate limit 3 req/s — выдерживаем паузой 400 мс).

   Использование:
     node scripts/pubmed_harvest.mjs                     # все породы
     node scripts/pubmed_harvest.mjs --breed "Такса"     # одна порода (по name/name_en)
     node scripts/pubmed_harvest.mjs --limit 5           # максимум статей на породу
     node scripts/pubmed_harvest.mjs --out my.json       # свой файл вывода
   Выход: harvest-YYYY-MM-DD.json (или --out) + сводка в stdout. */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, "..");

// ---------- CLI ----------
const argv = process.argv.slice(2);
function flag(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : fallback;
}
const BREED_FILTER = flag("breed", null);
const LIMIT = Number(flag("limit", "10"));
const OUT = flag("out", `harvest-${new Date().toISOString().slice(0, 10)}.json`);
const MAX_BREEDS = Number(flag("max-breeds", "0")); // 0 = без лимита (для пробных прогонов)

// ---------- data.js ----------
const raw = readFileSync(join(ROOT, "data.js"), "utf-8");
const m = raw.match(/const\s+ATLAS\s*=\s*(\{[\s\S]*\})\s*;\s*$/);
if (!m) throw new Error("data.js: не найден `const ATLAS = {...};`");
const ATLAS = JSON.parse(m[1]);

const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function esearch(term) {
  const url = `${EUTILS}/esearch.fcgi?db=pubmed&retmode=json&retmax=${LIMIT}&term=${encodeURIComponent(term)}`;
  const res = await fetch(url, { headers: { "User-Agent": "vetpredis-harvest/0.1 (curation pipeline)" } });
  if (!res.ok) throw new Error(`esearch HTTP ${res.status}`);
  const j = await res.json();
  return j.esearchresult?.idlist ?? [];
}

async function esummary(ids) {
  if (!ids.length) return [];
  const url = `${EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`;
  const res = await fetch(url, { headers: { "User-Agent": "vetpredis-harvest/0.1 (curation pipeline)" } });
  if (!res.ok) throw new Error(`esummary HTTP ${res.status}`);
  const j = await res.json();
  return ids.map((id) => {
    const s = j.result?.[id] ?? {};
    return {
      pmid: id,
      title: s.title ?? "",
      journal: s.fulljournalname ?? s.source ?? "",
      pubdate: s.pubdate ?? "",
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
    };
  });
}

// Ключевые слова релевантности в заголовке (грубая фильтрация «породного» шума).
const RELEVANT = /(predispos|prevalen|inciden|risk|breed|mutation|genetic|familial|deficien|syndrome|disease|anomal|degenerat|luxation|dyspla)/i;

async function main() {
  const breeds = ATLAS.breeds
    .filter((b) => !BREED_FILTER || b.name === BREED_FILTER || b.name_en.toLowerCase() === BREED_FILTER.toLowerCase())
    .slice(0, MAX_BREEDS || undefined);
  if (!breeds.length) {
    console.error(`Порода не найдена: ${BREED_FILTER}`);
    process.exit(1);
  }
  const harvest = { generated: new Date().toISOString(), limit_per_breed: LIMIT, entries: [] };
  let total = 0;

  for (const b of breeds) {
    const term = `"${b.name_en}" AND (predisposition OR prevalence OR risk)`;
    let ids = [];
    try {
      ids = await esearch(term);
      await sleep(400);
    } catch (e) {
      harvest.entries.push({ breed: b.name_en, id: b.id, error: String(e.message), articles: [] });
      continue;
    }
    let articles = [];
    try {
      articles = await esummary(ids);
      await sleep(400);
    } catch (e) {
      harvest.entries.push({ breed: b.name_en, id: b.id, error: String(e.message), articles: [] });
      continue;
    }
    // TODO(курация): сюда встаёт LLM-извлечение кандидатов «порода—болезнь—цифра»
    // по аннотациям; пока — только библиография + грубый релеванс-фильтр.
    const relevant = articles.filter((a) => RELEVANT.test(a.title));
    harvest.entries.push({ breed: b.name_en, id: b.id, term, articles: relevant });
    total += relevant.length;
    console.log(`${b.name_en}: ${relevant.length}/${articles.length} релевантных`);
  }

  writeFileSync(OUT, JSON.stringify(harvest, null, 2));
  console.log(`\nитого: ${total} релевантных статей по ${breeds.length} породам → ${OUT}`);
  console.log("следующий шаг: ручная курация кандидатов → data.js (см. README «Роадмап пополнения»)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
