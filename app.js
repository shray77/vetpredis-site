/* app.js — Витрина атласа породных предрасположенностей (Task 231).
   Vanilla JS, без зависимостей и без сборки — канон статических витрин
   экосистемы. Данные: ./data.js (глобал ATLAS). */

(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var results = $("results");
  if (!results || typeof ATLAS === "undefined") return;

  var breeds = ATLAS.breeds || [];

  /* ---------- состояние ---------- */
  var state = {
    q: "",
    species: "all",   // all | dog | cat
    evidence: "all",  // all | A | B | C
    system: "all",
    mode: "breed",    // breed | disease
    open: {}          // id породы → раскрыта ли карточка
  };

  /* ---------- утилиты ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function hay(breed) {
    return [breed.name, breed.name_en].concat(breed.aliases || []).join(" ").toLowerCase();
  }
  function condHay(c) {
    return (c.disease + " " + c.system + " " + (c.key_fact || "")).toLowerCase();
  }
  var EV_CLS = { A: "green", B: "amber", C: "blue" };
  var EV_TITLE = {
    A: "Уровень A: систематический обзор / мета-анализ / крупная эпидемиология / установленная мутация",
    B: "Уровень B: когортное или клиническое исследование, несколько независимых работ",
    C: "Уровень C: кейс-серии, обзоры, экспертные перечисления"
  };
  function evBadge(ev) {
    return '<span class="ds-badge ds-badge--' + EV_CLS[ev] + '" title="' + esc(EV_TITLE[ev]) + '">' + ev + "</span>";
  }

  /* ---------- фильтрация ---------- */
  function matches(breed) {
    if (state.species !== "all" && breed.species !== state.species) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    if (hay(breed).indexOf(q) !== -1) return true;
    return (breed.conditions || []).some(function (c) { return condHay(c).indexOf(q) !== -1; });
  }
  function condVisible(breed, c) {
    if (state.evidence !== "all" && c.evidence !== state.evidence) return false;
    if (state.system !== "all" && c.system !== state.system) return false;
    return true;
  }
  function visibleBreeds() {
    return breeds.filter(function (b) {
      if (!matches(b)) return false;
      var cs = (b.conditions || []).filter(function (c) { return condVisible(b, c); });
      return cs.length > 0;
    });
  }

  /* ---------- рендер: режим «порода → болезни» ---------- */
  function renderBreedMode(list) {
    var html = "";
    list.forEach(function (b) {
      var cs = (b.conditions || []).filter(function (c) { return condVisible(b, c); });
      var emoji = b.species === "cat" ? "🐈" : "🐕";
      var open = !!state.open[b.id];
      html += '<article class="breed-card' + (open ? " open" : "") + '" id="breed-' + esc(b.id) + '">'
        + '<button class="breed-head" type="button" data-breed="' + esc(b.id) + '" aria-expanded="' + (open ? "true" : "false") + '">'
        + '<span class="emoji" aria-hidden="true">' + emoji + "</span>"
        + '<span class="tt"><span class="nm">' + esc(b.name) + '</span><span class="en">' + esc(b.name_en) + "</span></span>"
        + '<span class="cnt">' + cs.length + " св." + "</span>"
        + '<svg class="chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>'
        + "</button>"
        + '<div class="breed-body">'
        + cs.map(renderCond).join("")
        + "</div></article>";
    });
    results.innerHTML = html;
  }
  function renderCond(c) {
    var src = (c.sources || []).map(function (s) {
      return '<li><span class="pre">↗</span><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + "</a></li>";
    }).join("");
    return '<div class="cond">'
      + '<div class="hd"><span class="dz">' + esc(c.disease) + "</span>" + evBadge(c.evidence)
      + '<span class="sys">' + esc(c.system) + "</span></div>"
      + (c.key_fact ? '<p class="fact">' + esc(c.key_fact) + "</p>" : "")
      + (src ? '<ul class="src">' + src + "</ul>" : "")
      + "</div>";
  }

  /* ---------- рендер: режим «болезнь → породы» ---------- */
  function renderDiseaseMode(list) {
    /* агрегируем: болезнь (нормализованная строка) → [{breed, cond}] */
    var map = {}, order = [];
    list.forEach(function (b) {
      (b.conditions || []).forEach(function (c) {
        if (!condVisible(b, c)) return;
        var key = c.disease + "\u0000" + c.system;
        if (!map[key]) { map[key] = { disease: c.disease, system: c.system, rows: [] }; order.push(key); }
        map[key].rows.push({ breed: b, cond: c });
      });
    });
    order.sort(function (a, b2) { return map[a].disease.localeCompare(map[b2].disease, "ru"); });
    var q = state.q.trim().toLowerCase();
    if (q) {
      order = order.filter(function (k) {
        var m = map[k];
        if ((m.disease + " " + m.system).toLowerCase().indexOf(q) !== -1) return true;
        return m.rows.some(function (r) { return hay(r.breed).indexOf(q) !== -1; });
      });
    }
    var html = order.map(function (k) {
      var m = map[k];
      var rows = m.rows.slice().sort(function (a, b2) { return a.breed.name.localeCompare(b2.name, "ru"); });
      return '<article class="disease-card">'
        + '<div class="hd"><span class="nm">' + esc(m.disease) + "</span>"
        + '<span class="sys">' + esc(m.system) + "</span></div>"
        + '<ul class="brd">'
        + rows.map(function (r) {
            return '<li>' + evBadge(r.cond.evidence)
              + '<span class="bd"><a href="?breed=' + encodeURIComponent(r.breed.id) + '" data-breed-link="' + esc(r.breed.id) + '">'
              + esc(r.breed.name) + "</a></span></li>";
          }).join("")
        + "</ul></article>";
    }).join("");
    results.innerHTML = html;
    results.classList.remove("grid");
    results.classList.add("dgrid");
  }

  function renderBreedGrid() {
    results.classList.add("grid");
    results.classList.remove("dgrid");
  }

  /* ---------- empty / счётчики ---------- */
  function renderEmpty() {
    results.classList.remove("grid");
    results.classList.add("dgrid");
    results.innerHTML = '<div class="ds-empty" style="grid-column:1/-1">'
      + '<div class="ds-empty__glyph" aria-hidden="true">🐾</div>'
      + '<h3 class="ds-empty__title">Ничего не нашлось</h3>'
      + '<p class="ds-empty__hint">Смягчите фильтры или смените запрос. Атлас пока покрывает 22 породы MVP — вашей породы может не быть в seed-наборе.</p>'
      + '<button class="ds-btn ds-btn--ghost" id="resetAll" type="button">Сбросить всё</button>'
      + "</div>";
    var r = $("resetAll");
    if (r) r.addEventListener("click", resetAll);
  }
  function resetAll() {
    state.q = ""; state.species = "all"; state.evidence = "all"; state.system = "all"; state.open = {};
    $("q").value = "";
    syncChips();
    fillSystems();
    render();
  }
  function syncChips() {
    document.querySelectorAll(".chiprow .ds-chip[data-sp]").forEach(function (el) {
      var on = el.getAttribute("data-sp") === state.species;
      el.classList.toggle("on", on); el.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll(".chiprow .ev-chip[data-ev]").forEach(function (el) {
      var on = el.getAttribute("data-ev") === state.evidence;
      el.classList.toggle("on", on); el.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
  function updateCounters() {
    var nB = breeds.length;
    var nL = 0, nS = 0, ev = { A: 0, B: 0, C: 0 }, seen = {};
    breeds.forEach(function (b) {
      (b.conditions || []).forEach(function (c) {
        nL++; ev[c.evidence] = (ev[c.evidence] || 0) + 1;
        (c.sources || []).forEach(function (s) { seen[s.url] = 1; });
      });
    });
    nS = Object.keys(seen).length;
    $("statBreeds").textContent = nB;
    $("statLinks").textContent = nL;
    $("statSources").textContent = nS;
    $("statEvA").innerHTML = esc(ev.A) + "<small> / " + esc(ev.B) + " / " + esc(ev.C) + "</small>";
    $("updated").textContent = ATLAS.updated || "—";
  }

  /* ---------- главный рендер ---------- */
  function render() {
    var list = visibleBreeds();
    var q = state.q.trim().toLowerCase();
    if (state.mode === "disease") {
      var anyRows = list.some(function (b) {
        return (b.conditions || []).some(function (c) { return condVisible(b, c); });
      });
      if (!anyRows) { renderEmpty(); }
      else { renderDiseaseMode(list); }
      $("count").textContent = "режим «болезнь → породы»" + (q ? " · запрос: «" + state.q.trim() + "»" : "");
    } else {
      if (!list.length) { renderEmpty(); }
      else { renderBreedGrid(); renderBreedMode(list); }
      $("count").textContent = list.length + " " + plural(list.length, "порода", "породы", "пород")
        + (q ? " · запрос: «" + state.q.trim() + "»" : "");
    }
  }
  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }

  /* ---------- события ---------- */
  var qt;
  $("q").addEventListener("input", function () {
    clearTimeout(qt);
    qt = setTimeout(function () { state.q = $("q").value; render(); }, 120);
  });
  document.querySelectorAll(".chiprow .ds-chip[data-sp]").forEach(function (el) {
    el.addEventListener("click", function () {
      state.species = el.getAttribute("data-sp");
      syncChips(); render();
    });
  });
  document.querySelectorAll(".chiprow .ev-chip[data-ev]").forEach(function (el) {
    el.addEventListener("click", function () {
      state.evidence = el.getAttribute("data-ev");
      syncChips(); render();
    });
  });
  function fillSystems() {
    var sel = $("sys");
    var set = {};
    breeds.forEach(function (b) { (b.conditions || []).forEach(function (c) { set[c.system] = 1; }); });
    var opts = Object.keys(set).sort(function (a, b) { return a.localeCompare(b, "ru"); });
    sel.innerHTML = '<option value="all">все системы</option>'
      + opts.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + "</option>"; }).join("");
    sel.value = state.system;
    if (sel.value !== state.system) { state.system = "all"; sel.value = "all"; }
  }
  $("sys").addEventListener("change", function () { state.system = $("sys").value; render(); });

  $("tabBreed").addEventListener("click", function () { setMode("breed"); });
  $("tabDisease").addEventListener("click", function () { setMode("disease"); });
  function setMode(m) {
    state.mode = m;
    $("tabBreed").classList.toggle("on", m === "breed");
    $("tabDisease").classList.toggle("on", m === "disease");
    $("tabBreed").setAttribute("aria-selected", m === "breed" ? "true" : "false");
    $("tabDisease").setAttribute("aria-selected", m === "disease" ? "true" : "false");
    render();
  }

  /* раскрытие карточек + переходы из режима болезней (делегирование) */
  results.addEventListener("click", function (e) {
    var head = e.target.closest ? e.target.closest(".breed-head") : null;
    if (head) {
      var id = head.getAttribute("data-breed");
      state.open[id] = !state.open[id];
      render();
      var card = $("breed-" + id);
      if (card && state.open[id]) card.scrollIntoView({ block: "nearest", behavior: "smooth" });
      return;
    }
    var link = e.target.closest ? e.target.closest("[data-breed-link]") : null;
    if (link) {
      e.preventDefault();
      var bid = link.getAttribute("data-breed-link");
      state.open[bid] = true;
      setMode("breed");
      var el = $("breed-" + bid);
      if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
      history.replaceState(null, "", "?breed=" + encodeURIComponent(bid));
    }
  });

  /* тема */
  var root = document.documentElement;
  $("themeToggle").addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "dark");
    try { localStorage.setItem("vetds-theme", dark ? "" : "dark"); } catch (err) {}
    root.dispatchEvent(new CustomEvent("vetds-theme", { detail: dark ? "" : "dark" }));
  });

  /* deep-link ?breed=<id> */
  (function () {
    var m = /(?:\?|&)breed=([^&]+)/.exec(location.search);
    if (m) {
      var id = decodeURIComponent(m[1]);
      if (breeds.some(function (b) { return b.id === id; })) {
        state.open[id] = true;
        state.q = "";
        setTimeout(function () {
          var el = $("breed-" + id);
          if (el) el.scrollIntoView({ block: "start" });
        }, 60);
      }
    }
  })();

  /* старт */
  fillSystems();
  updateCounters();
  render();
})();
