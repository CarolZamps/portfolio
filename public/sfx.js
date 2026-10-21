/*
 * Efeitos sonoros do portfólio e do deck, sintetizados no navegador (sem arquivos de áudio).
 * Começam DESLIGADOS: só tocam depois que a pessoa liga o botão, e a escolha fica salva.
 * API: window.Sfx.play(nome, volume?), .enabled, .setEnabled(bool), .toggle().
 * Quem quiser reagir ao liga/desliga escuta o evento "sfx-change" no window.
 */
(function () {
  var KEY = "sfx";
  var ctx = null;
  var master = null;
  var on = false;
  var last = {};
  try {
    on = localStorage.getItem(KEY) === "1";
  } catch (e) {}

  function ensure() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume().catch(function () {});
    return ctx;
  }

  function noise(c, dur) {
    var n = Math.floor(c.sampleRate * dur);
    var buf = c.createBuffer(1, n, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    var src = c.createBufferSource();
    src.buffer = buf;
    return src;
  }

  function env(g, t, peak, attack, total) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + total);
  }

  // "pop" de bolha: seno que cai de tom
  function pop(c, f, vol) {
    var t = c.currentTime;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f, t);
    o.frequency.exponentialRampToValueAtTime(f * 0.55, t + 0.09);
    env(g, t, 0.22 * vol, 0.006, 0.15);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.18);
  }

  // tecla: estalinho curto
  function tick(c, vol) {
    var t = c.currentTime;
    var s = noise(c, 0.02);
    var f = c.createBiquadFilter();
    var g = c.createGain();
    f.type = "highpass";
    f.frequency.value = 2200 + Math.random() * 900;
    env(g, t, 0.14 * vol, 0.002, 0.02);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(t);
  }

  // passada de marca-texto / troca de slide: ruído que sobe
  function swish(c, vol) {
    var t = c.currentTime;
    var s = noise(c, 0.4);
    var f = c.createBiquadFilter();
    var g = c.createGain();
    f.type = "bandpass";
    f.Q.value = 1.1;
    f.frequency.setValueAtTime(500, t);
    f.frequency.exponentialRampToValueAtTime(3200, t + 0.32);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.16 * vol, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(t);
  }

  // sticker descolando: ruído suave que desce
  function peel(c, vol) {
    var t = c.currentTime;
    var s = noise(c, 0.3);
    var f = c.createBiquadFilter();
    var g = c.createGain();
    f.type = "bandpass";
    f.Q.value = 0.8;
    f.frequency.setValueAtTime(3000, t);
    f.frequency.exponentialRampToValueAtTime(900, t + 0.22);
    env(g, t, 0.1 * vol, 0.02, 0.24);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(t);
  }

  function click(c, vol) {
    var t = c.currentTime;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(320, t);
    o.frequency.exponentialRampToValueAtTime(150, t + 0.05);
    env(g, t, 0.2 * vol, 0.003, 0.07);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.09);
    tick(c, vol * 0.7);
  }

  var SOUNDS = {
    pop: function (c, v) { pop(c, 640, v); },
    "msg-in": function (c, v) { pop(c, 720, v); },
    "msg-out": function (c, v) { pop(c, 520, v); },
    tick: tick,
    swish: swish,
    peel: peel,
    click: click
  };

  function play(name, vol) {
    if (!on || !SOUNDS[name]) return;
    var c = ensure();
    if (!c || c.state !== "running") return; // ainda sem gesto da pessoa: fica mudo
    var now = Date.now();
    if (last[name] && now - last[name] < 40) return; // evita rajada
    last[name] = now;
    SOUNDS[name](c, vol == null ? 1 : vol);
  }

  function emit() {
    try {
      window.dispatchEvent(new CustomEvent("sfx-change"));
    } catch (e) {}
  }

  function setEnabled(v) {
    on = !!v;
    try {
      localStorage.setItem(KEY, on ? "1" : "0");
    } catch (e) {}
    if (on) {
      ensure(); // chamado dentro do clique do botão: o navegador libera o áudio
      window.setTimeout(function () { play("msg-in"); }, 40);
    }
    emit();
  }

  // se a escolha já estava salva, libera o áudio no primeiro gesto da pessoa
  function unlock() {
    if (on) ensure();
  }
  document.addEventListener("pointerdown", unlock, { capture: true });
  document.addEventListener("keydown", unlock, { capture: true });

  window.Sfx = {
    play: play,
    get enabled() { return on; },
    setEnabled: setEnabled,
    toggle: function () { setEnabled(!on); }
  };
  emit();
})();
