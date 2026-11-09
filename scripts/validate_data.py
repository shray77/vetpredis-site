#!/usr/bin/env python3
"""validate_data.py — гейт качества data.js атласа породных предрасположенностей.

Читает data.js (глобал `const ATLAS = {...};` — тело строго JSON-совместимо),
парсит его как JSON и проверяет схему/семантику:
  - обязательные поля на каждом уровне, типы;
  - species ∈ {dog, cat}; evidence ∈ {A, B, C};
  - уникальность id пород и алиасов (нижний регистр);
  - источники: непустой label и валидный https-URL; уникальность URL в связи;
  - у каждой связи ≥ 1 источник; key_fact непустой (уровень C допускает
    отсутствие чисел, но не пустоту);
  - счётчики сводки (породы/связи/источники) печатаются в stdout.

Выход: 0 — OK, 1 — нарушения (списком на stderr). Запускается вручную и в CI:
    python3 scripts/validate_data.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data.js"

EV_LEVELS = {"A", "B", "C"}
SPECIES = {"dog", "cat"}
URL_RE = re.compile(r"^https?://[^\s\"']+$")


def load_atlas() -> dict:
    text = DATA.read_text(encoding="utf-8")
    m = re.search(r"const\s+ATLAS\s*=\s*(\{.*\})\s*;\s*$", text, re.S)
    if not m:
        raise ValueError("data.js: не найден `const ATLAS = {...};` в конце файла")
    return json.loads(m.group(1))


def main() -> int:
    errors: list[str] = []
    try:
        atlas = load_atlas()
    except (ValueError, json.JSONDecodeError) as e:
        print(f"FAIL: data.js не парсится как JSON: {e}", file=sys.stderr)
        return 1

    breeds = atlas.get("breeds")
    if not isinstance(breeds, list) or not breeds:
        print("FAIL: breeds отсутствует или пуст", file=sys.stderr)
        return 1

    ids: set[str] = set()
    alias_map: dict[str, str] = {}
    n_links = 0
    all_urls: set[str] = set()
    ev_count = {"A": 0, "B": 0, "C": 0}

    for i, b in enumerate(breeds):
        pref = f"breeds[{i}] ({b.get('id', '?')})"
        for field in ("id", "species", "name", "name_en", "conditions"):
            if field not in b or b[field] in (None, ""):
                errors.append(f"{pref}: пустое/отсутствует поле {field!r}")
        if b.get("species") not in SPECIES:
            errors.append(f"{pref}: species={b.get('species')!r} ∉ dog|cat")
        if b.get("id") in ids:
            errors.append(f"{pref}: дубликат id {b.get('id')!r}")
        ids.add(b.get("id", f"__{i}"))

        for a in b.get("aliases", []):
            ka = a.strip().lower()
            if ka in alias_map and alias_map[ka] != b.get("id"):
                errors.append(f"{pref}: алиас {a!r} уже занят породой {alias_map[ka]!r}")
            alias_map[ka] = b.get("id", f"__{i}")

        conds = b.get("conditions")
        if not isinstance(conds, list) or not conds:
            errors.append(f"{pref}: conditions пуст или не список")
            continue
        for j, c in enumerate(conds):
            cpref = f"{pref}.conditions[{j}]"
            for field in ("disease", "system", "evidence", "sources"):
                if field not in c or c[field] in (None, ""):
                    errors.append(f"{cpref}: пустое/отсутствует поле {field!r}")
            if c.get("evidence") not in EV_LEVELS:
                errors.append(f"{cpref}: evidence={c.get('evidence')!r} ∉ A|B|C")
            else:
                ev_count[c["evidence"]] += 1
            if not str(c.get("key_fact", "")).strip():
                errors.append(f"{cpref}: key_fact пуст (нужен контекст связи)")
            n_links += 1

            srcs = c.get("sources")
            if not isinstance(srcs, list) or not srcs:
                errors.append(f"{cpref}: нет ни одного источника")
                continue
            seen_in_cond: set[str] = set()
            for k, s in enumerate(srcs):
                spref = f"{cpref}.sources[{k}]"
                if not str(s.get("label", "")).strip():
                    errors.append(f"{spref}: пустой label")
                url = str(s.get("url", ""))
                if not URL_RE.match(url):
                    errors.append(f"{spref}: некорректный URL {url!r}")
                elif url in seen_in_cond:
                    errors.append(f"{spref}: дубликат URL внутри связи")
                else:
                    seen_in_cond.add(url)
                    all_urls.add(url)

    # сводка
    print(f"пород: {len(breeds)} (собаки: {sum(1 for b in breeds if b.get('species')=='dog')}, "
          f"кошки: {sum(1 for b in breeds if b.get('species')=='cat')})")
    print(f"связей: {n_links} (A={ev_count['A']}, B={ev_count['B']}, C={ev_count['C']})")
    print(f"уникальных первоисточников: {len(all_urls)}")
    print(f"обновлено: {atlas.get('updated', '—')} · версия: {atlas.get('version', '—')}")

    if errors:
        print(f"\nFAIL: {len(errors)} нарушений:", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        return 1
    print("OK: схема и семантика data.js корректны")
    return 0


if __name__ == "__main__":
    sys.exit(main())
