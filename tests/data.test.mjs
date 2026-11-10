/* tests/data.test.mjs — node --test: data.js парсится и проходит схему.
   Конвенция статических витрин экосистемы (ср. biobarrier/vetfecrt):
   данные — часть контракта, гейтится тестом без сборки.
   v0.2 «Лента»: каждая связь несёт hook (заголовок-хук) и plain
   (простыми словами) — проверяем их наличие и длины. */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "..", "data.js"), "utf-8");

function loadAtlas() {
  const m = raw.match(/const\s+ATLAS\s*=\s*(\{[\s\S]*\})\s*;\s*$/);
  assert.ok(m, "data.js должен заканчиваться `const ATLAS = {...};`");
  return JSON.parse(m[1]);
}

test("data.js парсится как JSON", () => {
  const atlas = loadAtlas();
  assert.equal(typeof atlas.updated, "string");
  assert.ok(Array.isArray(atlas.breeds) && atlas.breeds.length >= 56);
});

test("каждая порода: поля, вид, теглайн", () => {
  const { breeds } = loadAtlas();
  for (const b of breeds) {
    assert.ok(b.id && b.name && b.name_en, `порода ${JSON.stringify(b.name)} без id/имён`);
    assert.ok(["dog", "cat"].includes(b.species), `порода ${b.id}: species=${b.species}`);
    assert.ok(Array.isArray(b.aliases) && b.aliases.length > 0, `порода ${b.id}: нет алиасов`);
    assert.ok(typeof b.tagline === "string" && b.tagline.trim().length > 0 && b.tagline.length <= 64,
      `порода ${b.id}: tagline пуст/длинный`);
    assert.ok(Array.isArray(b.conditions) && b.conditions.length > 0, `порода ${b.id}: conditions пуст`);
  }
});

test("id пород уникальны", () => {
  const { breeds } = loadAtlas();
  const ids = breeds.map((b) => b.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("каждая связь: хук, простой язык, наука и источники", () => {
  const { breeds } = loadAtlas();
  for (const b of breeds) {
    for (const c of b.conditions) {
      assert.ok(c.disease && c.system, `связь у ${b.id}: нет disease/system`);
      assert.ok(["A", "B", "C"].includes(c.evidence), `связь у ${b.id}: evidence=${c.evidence}`);
      assert.ok(c.hook && c.hook.trim().length > 0 && c.hook.length <= 90,
        `связь у ${b.id}: hook пуст/длинный`);
      assert.ok(c.plain && c.plain.trim().length >= 40,
        `связь у ${b.id}: plain короче 40 символов`);
      assert.ok(c.key_fact && c.key_fact.trim().length > 0, `связь у ${b.id}: key_fact пуст`);
      assert.ok(Array.isArray(c.sources) && c.sources.length > 0, `связь у ${b.id}: нет источников`);
      for (const s of c.sources) {
        assert.ok(s.label && s.label.trim().length > 0, `источник у ${b.id}/${c.disease}: пустой label`);
        assert.ok(/^https?:\/\/[^\s]+$/.test(s.url), `источник «${s.label}»: некорректный URL ${s.url}`);
      }
    }
  }
});

test("охват: собаки и кошки, все уровни, связей хватает", () => {
  const { breeds } = loadAtlas();
  const dogs = breeds.filter((b) => b.species === "dog");
  const cats = breeds.filter((b) => b.species === "cat");
  assert.ok(dogs.length >= 38, `собак меньше 38: ${dogs.length}`);
  assert.ok(cats.length >= 17, `кошек меньше 17: ${cats.length}`);
  const links = breeds.flatMap((b) => b.conditions);
  assert.ok(links.length >= 85, `связей меньше 85: ${links.length}`);
  const evs = links.map((c) => c.evidence);
  assert.ok(evs.includes("A") && evs.includes("B") && evs.includes("C"),
    "должны присутствовать все три уровня доказательности");
});

test("нет плейсхолдеров, мусора и CJK-артефактов", () => {
  const { breeds } = loadAtlas();
  const bad = /TODO|XXX|\?\?\?|待补充|undefined|NaN|[\u4e00-\u9fff]/;
  for (const b of breeds) {
    const blob = JSON.stringify(b);
    assert.ok(!bad.test(blob), `порода ${b.id}: мусор/CJK в данных (${blob.match(bad)})`);
  }
});
