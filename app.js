/* Deutsch-Stern – App-Logik
   Läuft komplett offline. Alle Aufgaben stehen in aufgaben.js,
   der Fortschritt liegt nur im localStorage dieses Geräts. */
(function () {
  'use strict';

  var WELTEN = window.WELTEN || [];
  var AUFGABEN = window.AUFGABEN || [];
  var KEY = 'deutschStern.v1';
  var istAndroidApp = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

  function $(id) { return document.getElementById(id); }
  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }
  function mische(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function zufall(a) { return a[Math.floor(Math.random() * a.length)]; }
  function heute(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function gestern() { var d = new Date(); d.setDate(d.getDate() - 1); return heute(d); }
  function welt(id) { for (var i = 0; i < WELTEN.length; i++) if (WELTEN[i].id === id) return WELTEN[i]; return { id: id, name: id, emoji: '⭐', farbe: '#7C5CFF' }; }
  var AUFGABE_NACH_ID = {};
  AUFGABEN.forEach(function (a) { AUFGABE_NACH_ID[a.id] = a; });

  /* ---------- Speicherstand ---------- */
  var STANDARD = {
    sterne: 0, geloest: 0, figur: '🦊', gekauft: {}, zubehoer: null,
    stats: {}, gesehen: {}, tage: { letzter: null, serie: 0 },
    mission: null, missionen: 0, abzeichen: {}, geschichten: [], ton: true
  };
  var stand = laden();

  function laden() {
    var s = JSON.parse(JSON.stringify(STANDARD));
    try {
      var roh = JSON.parse(localStorage.getItem(KEY) || '{}');
      Object.keys(s).forEach(function (k) { if (roh[k] !== undefined && roh[k] !== null) s[k] = roh[k]; });
      if (roh.zubehoer) s.zubehoer = roh.zubehoer;
      if (roh.mission) s.mission = roh.mission;
    } catch (e) { /* kaputter Speicher: neu anfangen */ }
    return s;
  }
  function speichern() {
    try { localStorage.setItem(KEY, JSON.stringify(stand)); } catch (e) { /* voll oder gesperrt */ }
  }

  function tagesSerie() {
    var t = stand.tage;
    if (t.letzter === heute() || t.letzter === gestern()) return t.serie;
    return 0;
  }
  function tagZaehlen() {
    var t = stand.tage;
    if (t.letzter === heute()) return;
    t.serie = (t.letzter === gestern()) ? t.serie + 1 : 1;
    t.letzter = heute();
  }

  /* ---------- Laden (Belohnungen) ---------- */
  var FIGUREN = ['🦊', '🐼', '🐰', '🦉', '🐱', '🐶', '🦄', '🐢'];
  var WAREN = [
    { id: 'pflanze', e: '🪴', n: 'Pflanze', p: 5, art: 'deko' },
    { id: 'schleife', e: '🎀', n: 'Schleife', p: 6, art: 'zubehoer' },
    { id: 'bild', e: '🖼️', n: 'Bild', p: 8, art: 'deko' },
    { id: 'buecher', e: '📚', n: 'Bücher', p: 10, art: 'deko' },
    { id: 'kappe', e: '🧢', n: 'Kappe', p: 10, art: 'zubehoer' },
    { id: 'teddy', e: '🧸', n: 'Teddy', p: 12, art: 'deko' },
    { id: 'brille', e: '🕶️', n: 'Sonnenbrille', p: 14, art: 'zubehoer' },
    { id: 'gitarre', e: '🎸', n: 'Gitarre', p: 15, art: 'deko' },
    { id: 'hut', e: '🎩', n: 'Zylinder', p: 18, art: 'zubehoer' },
    { id: 'aquarium', e: '🐠', n: 'Aquarium', p: 20, art: 'deko' },
    { id: 'regenbogen', e: '🌈', n: 'Regenbogen', p: 25, art: 'deko' },
    { id: 'klavier', e: '🎹', n: 'Klavier', p: 30, art: 'deko' },
    { id: 'katze', e: '🐈', n: 'Katze', p: 35, art: 'deko' },
    { id: 'krone', e: '👑', n: 'Krone', p: 40, art: 'zubehoer' },
    { id: 'globus', e: '🌍', n: 'Globus', p: 40, art: 'deko' },
    { id: 'rakete', e: '🚀', n: 'Rakete', p: 50, art: 'deko' }
  ];
  function ware(id) { for (var i = 0; i < WAREN.length; i++) if (WAREN[i].id === id) return WAREN[i]; return null; }

  /* ---------- Abzeichen ---------- */
  function weltStat(id) { return stand.stats[id] || { r: 0, g: 0 }; }
  var ABZEICHEN = [
    { id: 'erste', e: '🌱', n: 'Erste Aufgabe', ok: function () { return stand.geloest >= 1; } },
    { id: 'mission1', e: '🎯', n: 'Erste Mission', ok: function () { return stand.missionen >= 1; } },
    { id: 'mission10', e: '🏅', n: '10 Missionen', ok: function () { return stand.missionen >= 10; } },
    { id: 'tage3', e: '🔥', n: '3 Tage in Folge', ok: function () { return tagesSerie() >= 3; } },
    { id: 'tage7', e: '🌟', n: '7 Tage in Folge', ok: function () { return tagesSerie() >= 7; } },
    { id: 'sterne100', e: '💯', n: '100 Sterne', ok: function () { return stand.sterne + ausgegeben() >= 100; } },
    { id: 'autorin', e: '✍️', n: 'Erste Geschichte', ok: function () { return stand.geschichten.length >= 1; } },
    { id: 'entdecker', e: '🧭', n: 'Alle Welten besucht', ok: function () { return WELTEN.every(function (w) { return weltStat(w.id).g > 0; }); } }
  ];
  WELTEN.forEach(function (w) {
    var anzahl = AUFGABEN.filter(function (a) { return a.welt === w.id; }).length;
    var ziel = w.id === 'schreibwerkstatt' ? 3 : Math.max(3, Math.min(10, Math.round(anzahl * 0.6)));
    ABZEICHEN.push({ id: 'welt-' + w.id, e: w.emoji, n: w.name + '-Profi', ok: function () { return weltStat(w.id).r >= ziel; } });
  });
  function ausgegeben() {
    return Object.keys(stand.gekauft).reduce(function (s, id) { var w = ware(id); return s + (w ? w.p : 0); }, 0);
  }
  function neueAbzeichen() {
    var neu = [];
    ABZEICHEN.forEach(function (a) {
      if (!stand.abzeichen[a.id] && a.ok()) { stand.abzeichen[a.id] = heute(); neu.push(a); }
    });
    return neu;
  }

  /* ---------- Ton & Vorlesen ---------- */
  var audio = null;
  function ton(art) {
    if (!stand.ton) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var noten = { richtig: [660, 880], falsch: [300, 240], fertig: [523, 659, 784, 1047], kauf: [784, 988] }[art] || [440];
      noten.forEach(function (f, i) {
        var o = audio.createOscillator(), g = audio.createGain();
        o.type = 'sine'; o.frequency.value = f;
        var t = audio.currentTime + i * 0.11;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g); g.connect(audio.destination); o.start(t); o.stop(t + 0.25);
      });
    } catch (e) { /* kein Ton möglich */ }
  }

  var kannSprechen = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  var sprechKnopf = null;
  function vorlesen(text, knopf) {
    if (!kannSprechen) return;
    var warAktiv = sprechKnopf === knopf && speechSynthesis.speaking;
    stopVorlesen();
    if (warAktiv) return;
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE'; u.rate = 0.9;
    var stimmen = speechSynthesis.getVoices().filter(function (v) { return /^de/i.test(v.lang); });
    if (stimmen.length) u.voice = stimmen[0];
    u.onend = u.onerror = function () { if (knopf) knopf.classList.remove('spricht'); sprechKnopf = null; };
    sprechKnopf = knopf;
    if (knopf) knopf.classList.add('spricht');
    speechSynthesis.speak(u);
  }
  function stopVorlesen() {
    if (!kannSprechen) return;
    speechSynthesis.cancel();
    if (sprechKnopf) sprechKnopf.classList.remove('spricht');
    sprechKnopf = null;
  }

  /* ---------- Konfetti ---------- */
  function konfetti() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var c = $('konfetti'), ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    var farben = ['#7C5CFF', '#FF6FA5', '#FFD23F', '#2FBF83', '#3BA7F5', '#FF9F43'];
    var teile = [];
    for (var i = 0; i < 110; i++) teile.push({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 3, r: Math.random() * 6.28, f: zufall(farben), s: 6 + Math.random() * 6 });
    var start = performance.now();
    (function bild(t) {
      ctx.clearRect(0, 0, c.width, c.height);
      teile.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.r += 0.1;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.f;
        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
      });
      if (t - start < 2600) requestAnimationFrame(bild); else ctx.clearRect(0, 0, c.width, c.height);
    })(start);
  }

  /* ---------- Popup ---------- */
  function popup(emoji, titel, text, knoepfe) {
    $('popup-emoji').textContent = emoji;
    $('popup-titel').textContent = titel;
    $('popup-text').textContent = text || '';
    var box = $('popup-knoepfe'); box.innerHTML = '';
    (knoepfe || [{ t: 'Super!', k: 'knopf-lila' }]).forEach(function (kn) {
      var b = el('button', 'knopf knopf-gross ' + (kn.k || 'knopf-hell'), kn.t);
      b.onclick = function () { schliessePopup(); if (kn.f) kn.f(); };
      box.appendChild(b);
    });
    $('popup').hidden = false;
    if (box.firstChild) box.firstChild.focus();
  }
  function schliessePopup() { $('popup').hidden = true; }
  function zeigeAbzeichen(liste, danach) {
    if (!liste.length) { if (danach) danach(); return; }
    var a = liste.shift();
    ton('fertig'); konfetti();
    popup(a.e, 'Neues Abzeichen!', a.n, [{ t: 'Juhu!', k: 'knopf-lila', f: function () { zeigeAbzeichen(liste, danach); } }]);
  }

  /* ---------- Navigation ---------- */
  var aktuellerScreen = 'home';
  var schutz = false;
  function zeige(name) {
    stopVorlesen();
    document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('aktiv'); });
    $('screen-' + name).classList.add('aktiv');
    aktuellerScreen = name;
    window.scrollTo(0, 0);
    if (name === 'home') zeichneStart();
    if (name === 'welten') zeichneWelten();
    if (name === 'zimmer') zeichneZimmer();
    if (name === 'fortschritt') zeichneFortschritt();
    if (name === 'buch') zeichneBuch();
    if (!istAndroidApp && name !== 'home' && !schutz) { history.pushState({ ds: 1 }, ''); schutz = true; }
  }
  function zurueck() {
    if (!$('popup').hidden) { schliessePopup(); return; }
    if (aktuellerScreen === 'aufgabe') { abbrechenFragen(); return; }
    if (aktuellerScreen === 'home') return;
    zeige('home');
  }
  window.addEventListener('popstate', function () {
    schutz = false;
    if (aktuellerScreen !== 'home') {
      zurueck();
      if (aktuellerScreen !== 'home' && !schutz) { history.pushState({ ds: 1 }, ''); schutz = true; }
    }
  });
  if (istAndroidApp && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
    window.Capacitor.Plugins.App.addListener('backButton', function () {
      if (aktuellerScreen === 'home' && $('popup').hidden) window.Capacitor.Plugins.App.exitApp();
      else zurueck();
    });
  }
  document.querySelectorAll('[data-zurueck]').forEach(function (b) {
    b.onclick = function () { if (schutz) history.back(); else zeige('home'); };
  });

  /* ---------- Startbildschirm ---------- */
  var GRUESSE = ['Schön, dass du da bist!', 'Bereit für neue Wörter?', 'Heute wird ein guter Lerntag!', 'Los geht’s, Sprachprofi!', 'Deine Figur hat schon auf dich gewartet.'];

  function figurMitZubehoer(knopf, gross) {
    knopf.textContent = stand.figur;
    var z = stand.zubehoer && stand.gekauft[stand.zubehoer] ? ware(stand.zubehoer) : null;
    if (z) { var s = el('span', 'zubehoer', z.e); knopf.appendChild(s); }
  }

  function zeichneStart() {
    figurMitZubehoer($('home-figur'));
    $('gruss').textContent = zufall(GRUESSE);
    $('home-sterne').textContent = stand.sterne;
    var serie = tagesSerie();
    $('home-tage').textContent = serie;
    $('home-tage-wort').textContent = serie === 1 ? 'Tag' : 'Tage';
    var m = aktuelleMission();
    var punkte = $('mission-punkte'); punkte.innerHTML = '';
    m.ids.forEach(function (id, i) {
      var p = el('span', i < m.pos ? 'fertig' : '', i < m.pos ? '✓' : welt(AUFGABE_NACH_ID[id].welt).emoji);
      punkte.appendChild(p);
    });
    var k = $('knopf-mission');
    if (m.fertig) {
      $('mission-text').textContent = 'Geschafft! Morgen wartet eine neue Mission.';
      k.textContent = 'Extra-Runde spielen'; k.className = 'knopf knopf-gross knopf-hell';
    } else if (m.pos >= m.ids.length) {
      $('mission-text').textContent = 'Alle Aufgaben gelöst – hol dir deinen Bonus!';
      k.textContent = 'Mission abschließen'; k.className = 'knopf knopf-gross knopf-lila';
    } else if (m.pos > 0) {
      $('mission-text').textContent = 'Noch ' + (m.ids.length - m.pos) + ' von ' + m.ids.length + ' Aufgaben';
      k.textContent = 'Mission weitermachen'; k.className = 'knopf knopf-gross knopf-lila';
    } else {
      $('mission-text').textContent = m.ids.length + ' Aufgaben · etwa 5–10 Minuten';
      k.textContent = 'Mission starten'; k.className = 'knopf knopf-gross knopf-lila';
    }
    $('knopf-ton').textContent = stand.ton ? '🔊 Ton an' : '🔈 Ton aus';
  }

  /* ---------- Aufgaben auswählen ---------- */
  // Reihenfolge: noch nie gesehen → schon mal falsch → schon richtig
  function rang(a) { var g = stand.gesehen[a.id]; return g === undefined ? 0 : g === 'f' ? 1 : 2; }
  function waehleAus(weltId, n) {
    var pool = AUFGABEN.filter(function (a) { return a.welt === weltId; });
    if (weltId === 'lesespuren') {
      // ein ganzer Text mit allen seinen Fragen
      var texte = {};
      pool.forEach(function (a) { (texte[a.titel] = texte[a.titel] || []).push(a); });
      var gruppen = mische(Object.keys(texte).map(function (t) { return texte[t]; }));
      gruppen.sort(function (x, y) {
        var rx = Math.min.apply(null, x.map(rang)), ry = Math.min.apply(null, y.map(rang));
        return rx - ry;
      });
      return gruppen.length ? gruppen[0].slice(0, n).map(function (a) { return a.id; }) : [];
    }
    return mische(pool).sort(function (x, y) { return rang(x) - rang(y); }).slice(0, n).map(function (a) { return a.id; });
  }
  function eineAus(weltId) {
    var pool = AUFGABEN.filter(function (a) { return a.welt === weltId; });
    if (!pool.length) return null;
    return mische(pool).sort(function (x, y) { return rang(x) - rang(y); })[0].id;
  }

  function aktuelleMission() {
    if (stand.mission && stand.mission.datum === heute() && stand.mission.ids &&
        stand.mission.ids.every(function (id) { return AUFGABE_NACH_ID[id]; })) return stand.mission;
    // Neue Mission: je eine Aufgabe aus jeder Übungswelt, jeden 3. Tag mit Schreibaufgabe
    var welten = WELTEN.map(function (w) { return w.id; }).filter(function (id) { return id !== 'schreibwerkstatt'; });
    welten = mische(welten).slice(0, 5);
    if (stand.missionen % 3 === 2 && AUFGABEN.some(function (a) { return a.welt === 'schreibwerkstatt'; })) {
      // die Welt, die am besten klappt, macht Platz für das Schreiben
      var beste = welten.slice().sort(function (a, b) { return quote(b) - quote(a); })[0];
      welten.splice(welten.indexOf(beste), 1);
      welten.push('schreibwerkstatt');
    }
    var ids = welten.map(eineAus).filter(Boolean);
    stand.mission = { datum: heute(), ids: ids, pos: 0, sterne: [], fertig: false };
    speichern();
    return stand.mission;
  }
  function quote(id) { var s = weltStat(id); return s.g ? s.r / s.g : 0; }

  /* ---------- Runde ---------- */
  var runde = null;   // { art, weltId, ids, pos, sterne:[] }
  var aufgabe = null; // aktuelle Aufgabe
  var versuche = 0;
  var gesperrt = false;

  function starteMission() {
    var m = aktuelleMission();
    if (m.fertig) { starteWelt(zufall(WELTEN.filter(function (w) { return w.id !== 'schreibwerkstatt'; })).id); return; }
    runde = { art: 'mission', ids: m.ids, pos: m.pos, sterne: m.sterne.slice() };
    // alle Aufgaben gelöst, aber vor „Fertig“ abgebrochen/neu geladen: Mission jetzt abschließen
    if (m.pos >= m.ids.length) { rundeFertig(); return; }
    zeige('aufgabe'); zeigeAufgabe();
  }
  function starteWelt(weltId) {
    var n = weltId === 'schreibwerkstatt' ? 1 : 5;
    var ids = waehleAus(weltId, n);
    if (!ids.length) { popup('🚧', 'Noch leer', 'In dieser Welt gibt es noch keine Aufgaben.'); return; }
    runde = { art: 'welt', weltId: weltId, ids: ids, pos: 0, sterne: [] };
    zeige('aufgabe'); zeigeAufgabe();
  }

  function zeigeAufgabe() {
    aufgabe = AUFGABE_NACH_ID[runde.ids[runde.pos]];
    versuche = 0; gesperrt = false;
    stopVorlesen();
    $('runde-balken').style.width = (runde.pos / runde.ids.length * 100) + '%';
    $('aufgabe-sterne').textContent = stand.sterne;
    var w = welt(aufgabe.welt);
    var schild = $('welt-schild');
    schild.textContent = w.emoji + ' ' + w.name + ' · ' + (runde.pos + 1) + '/' + runde.ids.length;
    schild.style.background = w.farbe;
    $('rueckmeldung').hidden = true;
    $('frage').textContent = aufgabe.frage;

    var lt = $('lesetext');
    if (aufgabe.typ === 'lesen') {
      lt.hidden = false;
      $('lesetext-titel').textContent = aufgabe.titel;
      var inhalt = $('lesetext-inhalt'); inhalt.innerHTML = '';
      String(aufgabe.text).split(/\n+/).forEach(function (absatz) { if (absatz.trim()) inhalt.appendChild(el('p', '', absatz.trim())); });
    } else lt.hidden = true;

    var box = $('aufgabe-inhalt'); box.innerHTML = '';
    ({ mc: baueAuswahl, lesen: baueAuswahl, fehler: baueFehler, sortieren: baueSortieren, satz: baueSatz, schreiben: baueSchreiben }[aufgabe.typ] || baueAuswahl)(box);
    window.scrollTo(0, 0);
  }

  /* --- Rückmeldung --- */
  var LOB = ['Super!', 'Richtig!', 'Klasse!', 'Genau!', 'Toll gemacht!', 'Stark!', 'Prima!'];
  var FAST = ['Fast!', 'Knapp daneben!', 'Noch nicht ganz.', 'Guter Versuch!'];
  function rueckmeldung(art, kopf, text, weiter) {
    var rm = $('rueckmeldung');
    rm.className = 'rueckmeldung ' + art;
    $('rm-kopf').textContent = kopf;
    $('rm-text').textContent = text || '';
    $('knopf-weiter').hidden = !weiter;
    $('knopf-weiter').textContent = (runde && runde.pos === runde.ids.length - 1) ? 'Fertig' : 'Weiter';
    rm.hidden = false;
    setTimeout(function () { rm.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
  }
  function tippText() {
    return aufgabe.tipp || 'Lies die Aufgabe noch einmal in Ruhe. Du schaffst das!';
  }
  // Ergebnis einer Aufgabe festhalten. sterne: 2 = erster Versuch, 1 = zweiter, 0 = Lösung gezeigt
  function abschliessen(sterne, sofortRichtig) {
    gesperrt = true;
    var s = stand.stats[aufgabe.welt] || (stand.stats[aufgabe.welt] = { r: 0, g: 0 });
    s.g++; if (sofortRichtig) s.r++;
    stand.gesehen[aufgabe.id] = sofortRichtig ? 'r' : 'f';
    stand.geloest++;
    stand.sterne += sterne;
    tagZaehlen();
    runde.sterne.push(sterne);
    if (runde.art === 'mission') { stand.mission.pos = runde.pos + 1; stand.mission.sterne = runde.sterne.slice(); }
    speichern();
    if (sterne > 0) {
      $('aufgabe-sterne').textContent = stand.sterne;
      var chip = $('sterne-chip'); chip.classList.remove('hupf'); void chip.offsetWidth; chip.classList.add('hupf');
    }
  }
  function richtig(zusatz) {
    var sterne = versuche === 0 ? 2 : 1;
    abschliessen(sterne, versuche === 0);
    ton('richtig');
    rueckmeldung('gut', zufall(LOB) + ' +' + sterne + ' ⭐', [zusatz, aufgabe.erklaerung].filter(Boolean).join(' '), true);
  }
  // gibt true zurück, wenn noch ein Versuch erlaubt ist
  function falsch(loesungText) {
    versuche++;
    ton('falsch');
    if (versuche < 2) {
      rueckmeldung('fast', zufall(FAST) + ' Versuch es noch einmal.', '💡 ' + tippText(), false);
      return true;
    }
    abschliessen(0, false);
    rueckmeldung('loesung', 'So ist es richtig:', [loesungText, aufgabe.erklaerung].filter(Boolean).join(' '), true);
    return false;
  }

  /* --- Typ: Auswahl (mc, lesen) --- */
  function baueAuswahl(box) {
    var liste = el('div', 'optionen');
    var reihenfolge = mische(aufgabe.optionen.map(function (_, i) { return i; }));
    var knoepfe = [];
    reihenfolge.forEach(function (i) {
      var b = el('button', 'option', aufgabe.optionen[i]);
      knoepfe[i] = b;
      b.onclick = function () {
        if (gesperrt) return;
        if (i === aufgabe.richtig) {
          b.classList.add('richtig');
          knoepfe.forEach(function (k) { k.disabled = true; });
          richtig();
        } else {
          b.classList.add('falsch'); b.disabled = true;
          if (!falsch('Die richtige Antwort ist: „' + aufgabe.optionen[aufgabe.richtig] + '“.')) {
            knoepfe[aufgabe.richtig].classList.add('richtig');
            knoepfe.forEach(function (k) { k.disabled = true; });
          }
        }
      };
      liste.appendChild(b);
    });
    box.appendChild(liste);
  }

  /* --- Typ: Fehler finden --- */
  function baueFehler(box) {
    var liste = el('div', 'woerter');
    var knoepfe = aufgabe.woerter.map(function (w, i) {
      var b = el('button', 'wort', w);
      b.onclick = function () {
        if (gesperrt) return;
        if (i === aufgabe.richtig) {
          b.classList.add('richtig'); b.textContent = aufgabe.korrektur;
          knoepfe.forEach(function (k) { k.disabled = true; });
          richtig('„' + aufgabe.woerter[i] + '“ schreibt man „' + aufgabe.korrektur + '“.');
        } else {
          b.classList.add('falsch'); b.disabled = true;
          if (!falsch('„' + aufgabe.woerter[aufgabe.richtig] + '“ war falsch. Richtig ist „' + aufgabe.korrektur + '“.')) {
            var r = knoepfe[aufgabe.richtig];
            r.classList.add('richtig'); r.textContent = aufgabe.korrektur;
            knoepfe.forEach(function (k) { k.disabled = true; });
          }
        }
      };
      liste.appendChild(b);
      return b;
    });
    box.appendChild(liste);
  }

  /* --- Typ: Sortieren --- */
  function baueSortieren(box) {
    var reihe = mische(aufgabe.woerter);
    var pos = 0, fehler = 0, fehlerHier = 0, wartet = false;
    var anzeige = el('div', 'sortier-wort');
    var kats = el('div', 'kategorien');
    var ablage = el('div', 'sortiert');
    var hinweis = el('p', 'leise mitte');
    var spalten = aufgabe.kategorien.map(function (k) {
      var d = el('div'); d.appendChild(el('b', '', k)); ablage.appendChild(d); return d;
    });
    function zeigeWort() {
      anzeige.innerHTML = '';
      var w = el('span', 'wort', reihe[pos].wort);
      anzeige.appendChild(w);
      anzeige.appendChild(el('span', 'zaehler', 'Wort ' + (pos + 1) + ' von ' + reihe.length));
    }
    function ablegen() {
      var s = spalten[reihe[pos].kat];
      s.appendChild(document.createTextNode((s.childNodes.length > 1 ? ', ' : '') + reihe[pos].wort));
      pos++; fehlerHier = 0; hinweis.textContent = '';
      if (pos < reihe.length) { zeigeWort(); return; }
      anzeige.innerHTML = ''; kats.innerHTML = '';
      versuche = fehler === 0 ? 0 : 1;
      if (fehler <= 2) richtig(fehler ? 'Du hast alle Wörter einsortiert.' : 'Alles beim ersten Versuch richtig!');
      else { abschliessen(0, false); ton('falsch'); rueckmeldung('loesung', 'Geschafft – mit etwas Hilfe.', 'Schau dir die Liste unten noch einmal an. ' + (aufgabe.erklaerung || ''), true); }
    }
    aufgabe.kategorien.forEach(function (k, i) {
      var b = el('button', 'knopf knopf-hell', k);
      b.onclick = function () {
        if (gesperrt || wartet || pos >= reihe.length) return;
        if (i === reihe[pos].kat) { ton('richtig'); ablegen(); return; }
        fehler++; fehlerHier++; ton('falsch');
        var w = anzeige.querySelector('.wort'); w.classList.remove('falsch'); void w.offsetWidth; w.classList.add('falsch');
        if (fehlerHier >= 2) {
          hinweis.textContent = '„' + reihe[pos].wort + '“ gehört zu: ' + aufgabe.kategorien[reihe[pos].kat] + '.';
          wartet = true; // bis zum automatischen Ablegen keine Tipps mehr annehmen
          setTimeout(function () {
            wartet = false;
            // Aufgabe inzwischen verlassen (Startseite/neue Runde)? Dann nichts mehr werten.
            if (!anzeige.parentNode || aktuellerScreen !== 'aufgabe' || gesperrt) return;
            ablegen();
          }, 1600);
        } else {
          hinweis.textContent = '💡 „' + reihe[pos].wort + '“ ist kein ' + k + '. Versuch es noch einmal.';
        }
      };
      kats.appendChild(b);
    });
    zeigeWort();
    box.appendChild(anzeige); box.appendChild(kats); box.appendChild(hinweis); box.appendChild(ablage);
  }

  /* --- Typ: Satz bauen --- */
  function baueSatz(box) {
    var loesung = aufgabe.woerter;
    var gemischt;
    var reihenfolge = loesung.map(function (_, i) { return i; });
    do { gemischt = mische(reihenfolge); } while (loesung.length > 1 && gemischt.join() === reihenfolge.join());
    var feld = el('div', 'satz-feld');
    var vorrat = el('div', 'woerter');
    var pruefen = el('button', 'knopf knopf-gross knopf-gruen', 'Prüfen');
    pruefen.disabled = true;
    var gelegt = []; // Indizes in der gelegten Reihenfolge
    var steine = {};
    gemischt.forEach(function (i) {
      var b = el('button', 'wort', loesung[i]);
      b.onclick = function () {
        if (gesperrt || b.classList.contains('benutzt')) return;
        b.classList.add('benutzt'); gelegt.push(i); zeichneFeld();
      };
      steine[i] = b; vorrat.appendChild(b);
    });
    function zeichneFeld() {
      feld.innerHTML = '';
      gelegt.forEach(function (i, p) {
        var b = el('button', 'wort', loesung[i]);
        b.onclick = function () {
          if (gesperrt) return;
          gelegt.splice(p, 1); steine[i].classList.remove('benutzt'); zeichneFeld();
          $('rueckmeldung').hidden = true;
        };
        feld.appendChild(b);
      });
      pruefen.disabled = gelegt.length !== loesung.length;
    }
    pruefen.onclick = function () {
      if (gesperrt) return;
      var satz = gelegt.map(function (i) { return loesung[i]; }).join(' ');
      var erlaubt = [loesung.join(' ')].concat((aufgabe.alternativen || []).map(function (a) { return Array.isArray(a) ? a.join(' ') : a; }));
      if (erlaubt.indexOf(satz) !== -1) {
        feld.querySelectorAll('.wort').forEach(function (w) { w.classList.add('richtig'); });
        pruefen.hidden = true;
        richtig();
      } else {
        var stimmen = 0;
        while (stimmen < loesung.length && loesung[gelegt[stimmen]] === loesung[stimmen]) stimmen++;
        if (falsch('„' + loesung.join(' ') + '“')) {
          pruefen.disabled = true; // erst nach Umlegen wieder prüfbar (Doppeltippen kostet sonst den 2. Versuch)
          var t = $('rm-text');
          t.textContent = (stimmen > 0 ? 'Die ersten ' + (stimmen === 1 ? 'Wort stimmt' : stimmen + ' Wörter stimmen') + ' schon. ' : '') + '💡 ' + tippText() + ' Tippe auf ein Wort oben, um es zurückzulegen.';
          if (stimmen === 1) t.textContent = t.textContent.replace('Die ersten Wort stimmt', 'Das erste Wort stimmt');
        } else {
          pruefen.hidden = true;
          feld.innerHTML = '';
          loesung.forEach(function (w) { var b = el('span', 'wort richtig', w); feld.appendChild(b); });
          vorrat.innerHTML = '';
        }
      }
    };
    box.appendChild(feld); box.appendChild(vorrat); box.appendChild(pruefen);
  }

  /* --- Typ: Schreiben --- */
  function zaehleWoerter(t) { var m = t.trim().match(/[A-Za-zÄÖÜäöüß0-9]+/g); return m ? m.length : 0; }
  function baueSchreiben(box) {
    if (aufgabe.impuls) box.appendChild(el('div', 'impuls', aufgabe.impuls));
    var feld = el('textarea', 'schreibfeld');
    feld.setAttribute('aria-label', 'Deine Geschichte');
    feld.setAttribute('spellcheck', 'false');
    feld.setAttribute('autocorrect', 'off');
    feld.placeholder = 'Schreib hier deine Geschichte …';
    var ziel = aufgabe.mindestWoerter || 20;
    var zaehler = el('div', 'wortzaehler');
    var fertig = el('button', 'knopf knopf-gross knopf-gruen', 'Geschichte speichern');
    function aktualisiere() {
      var n = zaehleWoerter(feld.value);
      zaehler.textContent = n + ' von ' + ziel + ' Wörtern' + (n >= ziel ? ' ✓' : '');
      zaehler.className = 'wortzaehler' + (n >= ziel ? ' genug' : '');
      fertig.disabled = n < ziel;
    }
    feld.oninput = aktualisiere;
    box.appendChild(feld); box.appendChild(zaehler);
    if (aufgabe.tipps && aufgabe.tipps.length) {
      var ul = el('ul', 'tipps');
      aufgabe.tipps.forEach(function (t) { ul.appendChild(el('li', '', t)); });
      box.appendChild(ul);
    }
    fertig.onclick = function () {
      if (gesperrt) return;
      stand.geschichten.unshift({ datum: heute(), titel: aufgabe.frage, impuls: aufgabe.impuls || '', text: feld.value.trim() });
      if (stand.geschichten.length > 50) stand.geschichten.length = 50;
      feld.readOnly = true; fertig.hidden = true; spaeter.hidden = true;
      versuche = 0;
      richtig('Deine Geschichte steht jetzt in deinem Geschichtenbuch.');
    };
    var spaeter = el('button', 'text-knopf', 'Heute nicht – überspringen');
    spaeter.onclick = function () {
      if (gesperrt) return;
      gesperrt = true;
      runde.sterne.push(0);
      if (runde.art === 'mission') { stand.mission.pos = runde.pos + 1; stand.mission.sterne = runde.sterne.slice(); speichern(); }
      weiter();
    };
    box.appendChild(fertig);
    var mitte = el('div', 'mitte'); mitte.appendChild(spaeter); box.appendChild(mitte);
    aktualisiere();
  }

  /* --- weiter / Ende --- */
  function weiter() {
    runde.pos++;
    if (runde.pos < runde.ids.length) { zeigeAufgabe(); return; }
    rundeFertig();
  }
  function rundeFertig() {
    var summe = runde.sterne.reduce(function (a, b) { return a + b; }, 0);
    var bonus = 0;
    if (runde.art === 'mission' && !stand.mission.fertig) {
      stand.mission.fertig = true; stand.missionen++; bonus = 5; stand.sterne += bonus;
    }
    speichern();
    var max = runde.ids.length * 2;
    var anteil = max ? summe / max : 0;
    $('erg-emoji').textContent = anteil >= 0.8 ? '🏆' : anteil >= 0.5 ? '🎉' : '🌱';
    $('erg-titel').textContent = runde.art === 'mission' ? 'Mission geschafft!' : 'Runde geschafft!';
    $('erg-text').textContent = anteil >= 0.8 ? 'Wow, das hat richtig gut geklappt!' : anteil >= 0.5 ? 'Gut gemacht! Mit jeder Runde wirst du sicherer.' : 'Dranbleiben lohnt sich – Üben macht stark!';
    $('erg-sterne').textContent = summe + bonus;
    $('erg-bonus').textContent = bonus ? 'inklusive ' + bonus + ' Bonus-Sterne für die Mission 🎯' : '';
    var liste = $('erg-liste'); liste.innerHTML = '';
    runde.sterne.forEach(function (s) { liste.appendChild(el('span', '', s === 2 ? '⭐' : s === 1 ? '✨' : '💪')); });
    $('erg-nochmal').textContent = runde.art === 'mission' ? 'Welten entdecken' : 'Noch eine Runde';
    zeige('ergebnis');
    ton('fertig');
    if (anteil >= 0.6) konfetti();
    setTimeout(function () { zeigeAbzeichen(neueAbzeichen()); speichern(); }, 900);
  }
  function abbrechenFragen() {
    stopVorlesen();
    var text = runde && runde.art === 'mission' ? 'Kein Problem – deine Mission wartet auf dich. Du machst später genau hier weiter.' : 'Deine Sterne aus dieser Runde behältst du.';
    popup('⏸️', 'Pause machen?', text, [
      { t: 'Weiterüben', k: 'knopf-lila' },
      { t: 'Zur Startseite', k: 'knopf-hell', f: function () { zeige('home'); } }
    ]);
  }

  /* ---------- Welten ---------- */
  function zeichneWelten() {
    var box = $('welten-liste'); box.innerHTML = '';
    WELTEN.forEach(function (w) {
      var anzahl = AUFGABEN.filter(function (a) { return a.welt === w.id; }).length;
      var geuebt = AUFGABEN.filter(function (a) { return a.welt === w.id && stand.gesehen[a.id] !== undefined; }).length;
      var b = el('button', 'welt-knopf');
      b.style.setProperty('--welt', w.farbe);
      b.appendChild(el('span', 'welt-emoji', w.emoji));
      var t = el('div'); t.style.flex = '1';
      t.appendChild(el('div', 'welt-name', w.name));
      t.appendChild(el('div', 'welt-thema', w.thema + ' · ' + geuebt + '/' + anzahl + ' geübt'));
      var mb = el('div', 'mini-balken'); var mbi = el('div'); mbi.style.width = (anzahl ? geuebt / anzahl * 100 : 0) + '%'; mb.appendChild(mbi);
      t.appendChild(mb);
      b.appendChild(t);
      b.onclick = function () { starteWelt(w.id); };
      box.appendChild(b);
    });
  }

  /* ---------- Zimmer ---------- */
  function zeichneZimmer() {
    $('zimmer-sterne').textContent = stand.sterne;
    var z = $('zimmer'); z.innerHTML = '';
    var deko = WAREN.filter(function (w) { return w.art === 'deko' && stand.gekauft[w.id]; });
    // feste Plätze rund um die Figur (Figur steht in der Mitte unten)
    var plaetze = [[1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [4, 2], [1, 3], [4, 3], [1, 4], [4, 4], [2, 2], [3, 2]];
    deko.forEach(function (w, i) {
      if (!plaetze[i]) return;
      var p = el('div', 'platz', w.e);
      p.style.gridColumn = plaetze[i][0]; p.style.gridRow = plaetze[i][1];
      p.title = w.n; z.appendChild(p);
    });
    var f = el('div', 'figur-im-zimmer'); figurMitZubehoer(f); z.appendChild(f);
    if (!deko.length) z.appendChild(el('div', 'zimmer-leer', 'Noch leer – kauf dir unten etwas Schönes!'));

    var fig = $('figuren'); fig.innerHTML = '';
    FIGUREN.forEach(function (e) {
      var b = el('button', e === stand.figur ? 'gewaehlt' : '', e);
      b.setAttribute('aria-label', 'Figur ' + e + ' wählen');
      b.onclick = function () { stand.figur = e; speichern(); zeichneZimmer(); };
      fig.appendChild(b);
    });

    var laden = $('laden'); laden.innerHTML = '';
    WAREN.forEach(function (w) {
      var hat = !!stand.gekauft[w.id];
      var b = el('button', 'ware' + (hat ? ' gekauft' : '') + (hat && stand.zubehoer === w.id ? ' aktiv-zubehoer' : ''));
      b.appendChild(el('span', 'e', w.e));
      b.appendChild(el('span', 'n', w.n));
      var preis = hat ? (w.art === 'zubehoer' ? (stand.zubehoer === w.id ? 'trägst du ✓' : 'anziehen') : 'im Zimmer ✓') : '⭐ ' + w.p;
      b.appendChild(el('span', 'p', preis));
      b.onclick = function () {
        if (hat) {
          if (w.art === 'zubehoer') { stand.zubehoer = stand.zubehoer === w.id ? null : w.id; speichern(); zeichneZimmer(); }
          return;
        }
        if (stand.sterne < w.p) {
          popup('⭐', 'Noch ' + (w.p - stand.sterne) + ' Sterne', 'Für „' + w.n + '“ brauchst du ' + w.p + ' Sterne. Mach eine Mission, dann klappt es bald!');
          return;
        }
        popup(w.e, w.n + ' kaufen?', 'Das kostet ' + w.p + ' von deinen ' + stand.sterne + ' Sternen.', [
          { t: 'Ja, kaufen', k: 'knopf-lila', f: function () {
            stand.sterne -= w.p; stand.gekauft[w.id] = heute();
            if (w.art === 'zubehoer') stand.zubehoer = w.id;
            speichern(); ton('kauf'); konfetti(); zeichneZimmer();
          } },
          { t: 'Lieber nicht', k: 'knopf-hell' }
        ]);
      };
      laden.appendChild(b);
    });
  }

  /* ---------- Fortschritt ---------- */
  function zeichneFortschritt() {
    var zahlen = $('fs-zahlen'); zahlen.innerHTML = '';
    [['⭐', stand.sterne + ' Sterne'], ['✅', stand.geloest + ' Aufgaben'], ['🎯', stand.missionen + ' Missionen'], ['🔥', tagesSerie() + ' Tage in Folge']].forEach(function (z) {
      zahlen.appendChild(el('div', 'chip', z[0] + ' ' + z[1]));
    });
    var liste = $('fs-liste'); liste.innerHTML = '';
    WELTEN.forEach(function (w) {
      var s = weltStat(w.id);
      var k = el('div', 'karte fs-welt');
      k.style.setProperty('--welt', w.farbe);
      k.appendChild(el('span', 'welt-emoji', w.emoji));
      var d = el('div');
      d.appendChild(el('div', 'welt-name', w.name));
      var mb = el('div', 'mini-balken'); var mbi = el('div');
      var q = s.g ? s.r / s.g : 0;
      mbi.style.width = (q * 100) + '%'; mb.appendChild(mbi); d.appendChild(mb);
      var status;
      if (w.id === 'schreibwerkstatt') status = s.g ? ['gut', s.r + (s.r === 1 ? ' Geschichte' : ' Geschichten') + ' geschrieben ✍️'] : ['', 'Noch keine Geschichte'];
      else if (s.g < 3) status = ['', s.g ? 'Gerade angefangen' : 'Noch nicht geübt'];
      else if (q >= 0.8) status = ['gut', 'Klappt schon richtig gut! 💪'];
      else if (q >= 0.5) status = ['', 'Klappt meistens – weiter so'];
      else status = ['ueben', 'Hier lohnt sich mehr Übung 🌱'];
      d.appendChild(el('div', 'fs-status ' + status[0], status[1] + (s.g && w.id !== 'schreibwerkstatt' ? ' · ' + s.r + ' von ' + s.g + ' sofort richtig' : '')));
      k.appendChild(d);
      liste.appendChild(k);
    });
    var ab = $('abzeichen'); ab.innerHTML = '';
    ABZEICHEN.forEach(function (a) {
      var d = el('div', 'abzeichen' + (stand.abzeichen[a.id] ? '' : ' zu'));
      d.appendChild(el('span', 'e', a.e)); d.appendChild(document.createTextNode(a.n));
      ab.appendChild(d);
    });
  }

  /* ---------- Geschichtenbuch ---------- */
  function zeichneBuch() {
    var box = $('buch-liste'); box.innerHTML = '';
    if (!stand.geschichten.length) {
      var k = el('div', 'karte mitte');
      k.appendChild(el('p', '', 'Hier sammeln sich deine Geschichten aus der Schreibwerkstatt. ✏️'));
      var b = el('button', 'knopf knopf-gross knopf-pink', 'Jetzt eine schreiben');
      b.onclick = function () { starteWelt('schreibwerkstatt'); };
      k.appendChild(b); box.appendChild(k); return;
    }
    stand.geschichten.forEach(function (g) {
      var k = el('div', 'karte geschichte');
      var d = g.datum.split('-');
      k.appendChild(el('div', 'datum', d[2] + '.' + d[1] + '.' + d[0]));
      k.appendChild(el('h3', '', g.titel));
      k.appendChild(el('p', '', g.text));
      box.appendChild(k);
    });
  }

  /* ---------- Knöpfe ---------- */
  $('knopf-mission').onclick = starteMission;
  $('knopf-welten').onclick = function () { zeige('welten'); };
  $('knopf-zimmer').onclick = function () { zeige('zimmer'); };
  $('home-figur').onclick = function () { zeige('zimmer'); };
  $('knopf-fortschritt').onclick = function () { zeige('fortschritt'); };
  $('knopf-buch').onclick = function () { zeige('buch'); };
  $('knopf-reset').onclick = function () {
    popup('🗑️', 'Alles zurücksetzen?', 'Sterne, Zimmer, Abzeichen und Geschichten werden auf diesem Gerät gelöscht. Das kann man nicht rückgängig machen.', [
      { t: 'Nein, behalten', k: 'knopf-lila' },
      { t: 'Ja, alles löschen', k: 'knopf-hell', f: function () {
        try { localStorage.removeItem(KEY); } catch (e) {}
        stand = laden(); zeige('home');
      } }
    ]);
  };
  $('knopf-ton').onclick =function () { stand.ton = !stand.ton; speichern(); zeichneStart(); };
  $('knopf-weiter').onclick = function () { stopVorlesen(); weiter(); };
  $('aufgabe-abbruch').onclick = abbrechenFragen;
  $('erg-start').onclick = function () { zeige('home'); };
  $('erg-nochmal').onclick = function () {
    if (runde && runde.art === 'welt') starteWelt(runde.weltId); else zeige('welten');
  };
  $('popup').onclick = function (e) { if (e.target === $('popup') && $('popup-knoepfe').children.length === 1) schliessePopup(); };

  if (kannSprechen) {
    $('frage-vorlesen').onclick = function () {
      var t = aufgabe.frage;
      if (aufgabe.typ === 'mc' || aufgabe.typ === 'lesen') t += ' ' + aufgabe.optionen.map(function (o, i) { return 'Antwort ' + (i + 1) + ': ' + o + '.'; }).join(' ');
      if (aufgabe.typ === 'schreiben' && aufgabe.impuls) t += ' ' + aufgabe.impuls;
      vorlesen(t, this);
    };
    $('lesetext-vorlesen').onclick = function () { vorlesen(aufgabe.titel + '. ' + aufgabe.text, this); };
    speechSynthesis.getVoices();
  } else {
    $('frage-vorlesen').hidden = true; $('lesetext-vorlesen').hidden = true;
  }

  zeichneStart();
  // App über Nacht offen/im Hintergrund: beim Zurückkommen Mission & Serie des neuen Tages zeigen
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && aktuellerScreen === 'home' && $('popup').hidden) zeichneStart();
  });

  if ('serviceWorker' in navigator && !istAndroidApp && location.protocol !== 'file:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
