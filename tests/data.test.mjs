/* tests/data.test.mjs — node --test: data.js парсится и проходит схему.
   Конвенция статических витрин экосистемы (ср. biobarrier/vetfecrt):
   данные — часть контракта, гейтится тестом без сборки. */

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
  assert.ok(Array.isArray(atlas.breeds) && atlas.breeds.length >= 20);
});

test("каждая порода: обязательные поля, корректный вид", () => {
  const { breeds } = loadAtlas();
  for (const b of breeds) {
    assert.ok(b.id && b.name && b.name_en, `порода ${JSON.stringify(b.name)} без id/имён`);
    assert.ok(["dog", "cat"].includes(b.species), `порода ${b.id}: species=${b.species}`);
    assert.ok(Array.isArray(b.aliases) && b.aliases.length > 0, `порода ${b.id}: нет алиасов`);
    assert.ok(Array.isArray(b.conditions) && b.conditions.length > 0, `порода ${b.id}: conditions пуст`);
  }
});

test("id пород уникальны", () => {
  const { breeds } = loadAtlas();
  const ids = breeds.map((b) => b.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("каждая связь: система, уровень A/B/C, факт и источники с https-URL", () => {
  const { breeds } = loadAtlas();
  for (const b of breeds) {
    for (const c of b.conditions) {
      assert.ok(c.disease && c.system, `связь у ${b.id}: нет disease/system`);
      assert.ok(["A", "B", "C"].includes(c.evidence), `связь у ${b.id}: evidence=${c.evidence}`);
      assert.ok(c.key_fact && c.key_fact.trim().length > 0, `связь у ${b.id}: key_fact пуст`);
      assert.ok(Array.isArray(c.sources) && c.sources.length > 0, `связь у ${b.id}: нет источников`);
      for (const s of c.sources) {
        assert.ok(s.label && s.label.trim().length > 0, `источник у ${b.id}/${c.disease}: пустой label`);
        assert.ok(/^https?:\/\/[^\s]+$/.test(s.url), `источник «${s.label}»: некорректный URL ${s.url}`);
      }
    }
  }
});

test("и собаки, и кошки покрыты; сводка уровней осмысленная", () => {
  const { breeds } = loadAtlas();
  const dogs = breeds.filter((b) => b.species === "dog");
  const cats = breeds.filter((b) => b.species === "cat");
  assert.ok(dogs.length >= 12, `собак меньше 12: ${dogs.length}`);
  assert.ok(cats.length >= 4, `кошек меньше 4: ${cats.length}`);
  const evs = breeds.flatMap((b) => b.conditions.map((c) => c.evidence));
  assert.ok(evs.includes("A") && evs.includes("B") && evs.includes("C"),
    "должны присутствовать все три уровня доказательности");
});

test("нет плейсхолдеров и мусора в данных", () => {
  const { breeds } = loadAtlas();
  const bad = /TODO|XXX|\?\?\?|待补充|undefined|NaN/;
  for (const b of breeds) {
    const blob = JSON.stringify(b);
    assert.ok(!bad.test(blob), `порода ${b.id}: мусор в данных (${blob.match(bad)})`);
  }
});
