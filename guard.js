// Shows "Continue em uma tela maior" when a large-screen prototype (Web, TV) is opened on a phone.
// A phone = touch screen whose shorter side is under 600px, so tablets still get the prototype.
(function () {
  function isPhone() {
    var coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;
    var shortSide = Math.min(screen.width, screen.height);
    return coarse && shortSide < 600;
  }
  // Inside the Comparar page the prototypes are iframes; only the top page decides.
  if (window.top !== window.self) return;

  var hub = new URL('./', document.currentScript.src).href;

  function show() {
    if (document.getElementById('gp-guard')) return;
    var css = document.createElement('style');
    css.textContent =
      '#gp-guard{position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;' +
      'padding:max(24px,env(safe-area-inset-top)) 24px max(24px,env(safe-area-inset-bottom));background:#0B0B0B;color:#fff;text-align:center;' +
      'font-family:Inter,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}' +
      '#gp-guard svg{width:96px;height:auto;margin-bottom:8px}' +
      '#gp-guard h1{margin:0;font-size:26px;line-height:1.2;font-weight:700}' +
      '#gp-guard p{margin:0;max-width:30ch;font-size:16px;line-height:1.45;color:#BDBDBD}' +
      '#gp-guard a{margin-top:16px;display:inline-flex;align-items:center;height:48px;padding:0 24px;border-radius:500px;background:rgba(255,255,255,.16);color:#fff;font-size:16px;font-weight:700;text-decoration:none;-webkit-tap-highlight-color:transparent}' +
      'html.gp-guarded,html.gp-guarded body{overflow:hidden!important}';
    document.head.appendChild(css);
    var el = document.createElement('div');
    el.id = 'gp-guard';
    el.innerHTML =
      '<svg viewBox="0 0 120 90" fill="#fff" aria-hidden="true"><rect x="0" y="0" width="120" height="72" rx="8"/><rect x="6" y="6" width="108" height="60" rx="3" fill="#0B0B0B"/><rect x="40" y="80" width="40" height="8" rx="4"/></svg>' +
      '<h1>Continue em uma tela maior</h1>' +
      '<p>Esta versão foi feita para computador ou TV. Abra o mesmo link em uma tela maior.</p>' +
      '<a href="' + hub + '">Voltar para os protótipos</a>';
    document.documentElement.classList.add('gp-guarded');
    document.body.appendChild(el);
    // Stop videos that may have started behind the notice.
    function hush(doc) {
      doc.querySelectorAll('video,audio').forEach(function (m) { try { m.muted = true; m.pause(); } catch (e) {} });
      doc.querySelectorAll('iframe').forEach(function (f) { try { hush(f.contentDocument); } catch (e) {} });
    }
    setInterval(function () { hush(document); }, 400);
  }

  function check() { if (isPhone()) show(); }
  if (document.body) check(); else document.addEventListener('DOMContentLoaded', check);
})();
