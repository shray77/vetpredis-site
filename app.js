/* app.js — Витрина атласа породных предрасположенностей (Task 232, v0.2 «Лента»).
   Vanilla JS, без зависимостей и без сборки — канон статических витрин
   экосистемы. Данные: ./data.js (глобал ATLAS).

   Режимы:
     feed    — лента фактов: одна связь «порода—болезнь» = одна карточка
              (хук + простой язык + научная плашка), шафл и подгрузка;
     breed   — атлас: карточка породы со раскрытием связей;
     disease — обратный индекс: болезнь → породы.

   Аватарки-эмодзи животных принципиально не используются: вид обозначается
   чипами и подписями, порода — текстовой плашкой (monogram в атласе). */

(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var results = $("results");
  if (!results || typeof ATLAS === "undefined") return;

  var breeds = ATLAS.breeds || [];
  var PAGE = 10;

  /* ---------- состояние ---------- */
  var state = {
    q: "",
    species: "all",    // all | dog | cat
    evidence: "all",   // all | A | B | C
    system: "all",
    breed: "all",      // фильтр породы в ленте
    mode: "feed",      // feed | breed | disease
    open: {},          // id породы → раскрыта ли карточка (атлас)
    feedPage: 1,       // сколько «страниц» ленты показано
    feedOrder: null    // шафл-порядок всех связей (массив индексов)
  };

  /* ---------- утилиты ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function hay(breed) {
    return [breed.name, breed.name_en, breed.tagline || ""].concat(breed.aliases || []).join(" ").toLowerCase();
  }
  function condHay(c) {
    return [c.disease, c.system, c.key_fact || "", c.hook || "", c.plain || ""].join(" ").toLowerCase();
  }
  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  var EV_CLS = { A: "green", B: "amber", C: "blue" };
  var EV_TITLE = {
    A: "Уровень A: наука прям уверена — систематический обзор / мета-анализ / крупная эпидемиология / установленная мутация",
    B: "Уровень B: похоже на правду — когортное или клиническое исследование, несколько независимых работ",
    C: "Уровень C: кейс-серии, обзоры, экспертные перечисления — количественных данных мало"
  };
  function evBadge(ev) {
    return '<span class="ds-badge ds-badge--' + EV_CLS[ev] + '" title="' + esc(EV_TITLE[ev]) + '">' + ev + "</span>";
  }
  function evLevel(ev) {
    return '<span class="fact-ev ev-' + ev + '" title="' + esc(EV_TITLE[ev]) + '">ур. ' + ev + "</span>";
  }

  /* ---------- плоский список всех связей ---------- */
  var LINKS = [];
  breeds.forEach(function (b) {
    (b.conditions || []).forEach(function (c) { LINKS.push({ breed: b, cond: c }); });
  });

  /* ---------- фильтрация ---------- */
  function qLow() { return state.q.trim().toLowerCase(); }
  function breedMatchesQ(b, q) {
    return !q || hay(b).indexOf(q) !== -1 ||
      (b.conditions || []).some(function (c) { return condHay(c).indexOf(q) !== -1; });
  }
  function condVisible(c) {
    if (state.evidence !== "all" && c.evidence !== state.evidence) return false;
    if (state.system !== "all" && c.system !== state.system) return false;
    return true;
  }
  function feedLinkVisible(l, q) {
    if (state.species !== "all" && l.breed.species !== state.species) return false;
    if (state.breed !== "all" && l.breed.id !== state.breed) return false;
    if (!condVisible(l.cond)) return false;
    if (q && hay(l.breed).indexOf(q) === -1 && condHay(l.cond).indexOf(q) === -1) return false;
    return true;
  }
  function feedList() {
    var q = qLow();
    if (!state.feedOrder) shuffleOrder();
    var out = [];
    state.feedOrder.forEach(function (i) {
      if (feedLinkVisible(LINKS[i], q)) out.push(LINKS[i]);
    });
    return out;
  }
  function shuffleOrder() {
    var idx = LINKS.map(function (_, i) { return i; });
    for (var i = idx.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = idx[i]; idx[i] = idx[j]; idx[j] = t;
    }
    state.feedOrder = idx;
  }

  /* ---------- рендер: лента фактов ---------- */
  function renderFeed() {
    var q = qLow();
    var list = feedList();
    var shown = list.slice(0, state.feedPage * PAGE);
    var html = shown.map(function (l) { return renderFactCard(l); }).join("");
    results.innerHTML = html;
    var rest = list.length - shown.length;
    var mb = $("moreBtn");
    if (rest > 0) {
      mb.hidden = false;
      mb.textContent = "ещё " + rest + " " + plural(rest, "факт", "факта", "фактов") + " ↓";
    } else {
      mb.hidden = true;
    }
    $("count").textContent = list.length + " " + plural(list.length, "факт", "факта", "фактов")
      + (q ? " · запрос: «" + state.q.trim() + "»" : "")
      + (state.feedOrder && list.length ? " · лента перемешана" : "");
  }
  function renderFactCard(l) {
    var b = l.breed, c = l.cond;
    var src = (c.sources || []).map(function (s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" title="' + esc(s.url) + '">' + esc(s.label) + "</a></li>";
    }).join("");
    return '<article class="fact-card">'
      + '<div class="fact-meta">'
      + '<button class="breed-pill" type="button" data-breed-link="' + esc(b.id) + '">'
      + esc(b.name) + '<span class="sp">' + (b.species === "cat" ? "кошка" : "собака") + "</span></button>"
      + evLevel(c.evidence)
      + '<span class="fact-sys">' + esc(c.system) + "</span>"
      + "</div>"
      + '<h3 class="fact-hook">' + esc(c.hook || c.disease) + "</h3>"
      + (c.plain ? '<p class="fact-plain">' + esc(c.plain) + "</p>" : "")
      + '<div class="fact-science">'
      + '<span class="fs-cap">наука</span>'
      + '<div class="fs-row"><span class="fs-dz">' + esc(c.disease) + "</span>"
      + '<span class="fs-fact">' + esc(c.key_fact || "") + "</span></div>"
      + (src ? '<ul class="fs-src">' + src + "</ul>" : "")
      + "</div></article>";
  }

  /* ---------- рендер: атлас «порода → болезни» ---------- */
  function renderBreedMode(list) {
    var html = "";
    list.forEach(function (b) {
      var cs = (b.conditions || []).filter(condVisible);
      var open = !!state.open[b.id];
      html += '<article class="breed-card' + (open ? " open" : "") + '" id="breed-' + esc(b.id) + '">'
        + '<button class="breed-head" type="button" data-breed="' + esc(b.id) + '" aria-expanded="' + (open ? "true" : "false") + '">'
        + '<span class="breed-glyph" aria-hidden="true">' + esc((b.name || "?").trim().charAt(0)) + "</span>"
        + '<span class="tt"><span class="nm">' + esc(b.name) + '</span><span class="tg">' + esc(b.tagline || b.name_en) + "</span></span>"
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
      + (c.hook ? '<p class="hookline">' + esc(c.hook) + "</p>" : "")
      + (c.key_fact ? '<p class="fact">' + esc(c.key_fact) + "</p>" : "")
      + (src ? '<ul class="src">' + src + "</ul>" : "")
      + "</div>";
  }

  /* ---------- рендер: «болезнь → породы» ---------- */
  function renderDiseaseMode(list) {
    var map = {}, order = [];
    list.forEach(function (b) {
      (b.conditions || []).forEach(function (c) {
        if (!condVisible(c)) return;
        var key = c.disease + "\u0000" + c.system;
        if (!map[key]) { map[key] = { disease: c.disease, system: c.system, rows: [] }; order.push(key); }
        map[key].rows.push({ breed: b, cond: c });
      });
    });
    order.sort(function (a, b2) { return map[a].disease.localeCompare(map[b2].disease, "ru"); });
    var q = qLow();
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
  }

  function visibleBreeds() {
    var q = qLow();
    return breeds.filter(function (b) {
      if (state.species !== "all" && b.species !== state.species) return false;
      if (!breedMatchesQ(b, q)) return false;
      return (b.conditions || []).some(condVisible);
    });
  }

  /* ---------- empty / счётчики ---------- */
  function renderEmpty() {
    results.innerHTML = '<div class="ds-empty" style="grid-column:1/-1;max-width:720px">'
      + '<div class="ds-empty__glyph" aria-hidden="true">🐾</div>'
      + '<h3 class="ds-empty__title">Такого факта пока нет</h3>'
      + '<p class="ds-empty__hint">Смягчите фильтры или смените запрос. Атлас покрывает ' + breeds.length + ' пород seed-набора — вашей породы может в нём не быть.</p>'
      + '<button class="ds-btn ds-btn--ghost" id="resetAll" type="button">Сбросить всё</button>'
      + "</div>";
    $("moreBtn").hidden = true;
    var r = $("resetAll");
    if (r) r.addEventListener("click", resetAll);
  }
  function resetAll() {
    state.q = ""; state.species = "all"; state.evidence = "all"; state.system = "all";
    state.breed = "all"; state.open = {}; state.feedPage = 1;
    $("q").value = "";
    syncChips();
    fillSystems();
    fillBreeds();
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
    var nL = 0, ev = { A: 0, B: 0, C: 0 }, seen = {};
    breeds.forEach(function (b) {
      (b.conditions || []).forEach(function (c) {
        nL++; ev[c.evidence] = (ev[c.evidence] || 0) + 1;
        (c.sources || []).forEach(function (s) { seen[s.url] = 1; });
      });
    });
    $("statBreeds").textContent = breeds.length;
    $("statLinks").textContent = nL;
    $("statSources").textContent = Object.keys(seen).length;
    $("statEvA").innerHTML = esc(ev.A) + "<small> / " + esc(ev.B) + " / " + esc(ev.C) + "</small>";
    $("updated").textContent = ATLAS.updated || "—";
  }

  /* ---------- главный рендер ---------- */
  function setResultsClass(cls) {
    results.classList.remove("feed", "grid", "dgrid");
    results.classList.add(cls);
  }
  function render() {
    var q = qLow();
    if (state.mode === "feed") {
      document.body.classList.add("mode-feed");
      setResultsClass("feed");
      renderFeed();
    } else {
      document.body.classList.remove("mode-feed");
      $("moreBtn").hidden = true;
      var list = visibleBreeds();
      if (state.mode === "disease") {
        setResultsClass("dgrid");
        var anyRows = list.some(function (b) {
          return (b.conditions || []).some(condVisible);
        });
        if (!anyRows) renderEmpty();
        else renderDiseaseMode(list);
        $("count").textContent = "режим «болезнь → породы»" + (q ? " · запрос: «" + state.q.trim() + "»" : "");
      } else {
        setResultsClass("grid");
        if (!list.length) renderEmpty();
        else renderBreedMode(list);
        $("count").textContent = list.length + " " + plural(list.length, "порода", "породы", "пород")
          + (q ? " · запрос: «" + state.q.trim() + "»" : "");
      }
    }
  }

  /* ---------- события ---------- */
  var qt;
  $("q").addEventListener("input", function () {
    clearTimeout(qt);
    qt = setTimeout(function () { state.q = $("q").value; state.feedPage = 1; render(); }, 120);
  });
  document.querySelectorAll(".chiprow .ds-chip[data-sp]").forEach(function (el) {
    el.addEventListener("click", function () {
      state.species = el.getAttribute("data-sp");
      state.feedPage = 1;
      syncChips(); render();
    });
  });
  document.querySelectorAll(".chiprow .ev-chip[data-ev]").forEach(function (el) {
    el.addEventListener("click", function () {
      state.evidence = el.getAttribute("data-ev");
      state.feedPage = 1;
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
  $("sys").addEventListener("change", function () {
    state.system = $("sys").value; state.feedPage = 1; render();
  });
  function fillBreeds() {
    var sel = $("breedSel");
    var list = breeds.slice().sort(function (a, b) { return a.name.localeCompare(b.name, "ru"); });
    sel.innerHTML = '<option value="all">все породы</option>'
      + list.map(function (b) { return '<option value="' + esc(b.id) + '">' + esc(b.name) + "</option>"; }).join("");
    sel.value = state.breed;
    if (sel.value !== state.breed) { state.breed = "all"; sel.value = "all"; }
  }
  $("breedSel").addEventListener("change", function () {
    state.breed = $("breedSel").value; state.feedPage = 1; render();
  });
  $("shuffleBtn").addEventListener("click", function () {
    shuffleOrder();
    state.feedPage = 1;
    render();
    results.scrollIntoView({ block: "start", behavior: "smooth" });
  });
  $("moreBtn").addEventListener("click", function () {
    state.feedPage++;
    render();
  });

  /* табы режимов */
  var TABS = { feed: $("tabFeed"), breed: $("tabBreed"), disease: $("tabDisease") };
  function setMode(m, pushUrl) {
    state.mode = m;
    Object.keys(TABS).forEach(function (k) {
      TABS[k].classList.toggle("on", k === m);
      TABS[k].setAttribute("aria-selected", k === m ? "true" : "false");
    });
    render();
    if (pushUrl) {
      try { history.replaceState(null, "", "?tab=" + m); } catch (err) {}
    }
  }
  TABS.feed.addEventListener("click", function () { setMode("feed", true); });
  TABS.breed.addEventListener("click", function () { setMode("breed", true); });
  TABS.disease.addEventListener("click", function () { setMode("disease", true); });

  /* раскрытие карточек атласа + переходы из ленты/режима болезней */
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
      state.q = ""; $("q").value = "";
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

  /* deep-links: ?breed=<id> открывает атлас с раскрытой породой; ?tab= — режим */
  (function () {
    var mB = /(?:\?|&)breed=([^&]+)/.exec(location.search);
    var mT = /(?:\?|&)tab=(feed|breed|disease)/.exec(location.search);
    if (mB) {
      var id = decodeURIComponent(mB[1]);
      if (breeds.some(function (b) { return b.id === id; })) {
        state.mode = "breed";
        state.open[id] = true;
        state.q = "";
        setTimeout(function () {
          var el = $("breed-" + id);
          if (el) el.scrollIntoView({ block: "start" });
        }, 60);
        return;
      }
    }
    if (mT) state.mode = mT[1];
  })();

  /* старт */
  fillSystems();
  fillBreeds();
  updateCounters();
  Object.keys(TABS).forEach(function (k) {
    TABS[k].classList.toggle("on", k === state.mode);
    TABS[k].setAttribute("aria-selected", k === state.mode ? "true" : "false");
  });
  render();
})();
