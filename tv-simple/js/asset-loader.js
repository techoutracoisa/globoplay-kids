/* Resolve os caminhos de midia do prototipo.
   Imagens: empacotadas em js/imagens-*.js (data URI WebP) para caber no limite de arquivos do GitHub.
   Videos grandes: divididos em partes de ate 5 MB (assets/video/*-parte-N.js) e remontados no navegador. */
(function(){
  var IMG = window.__IMG = window.__IMG || {};
  var VID = {
  "uploads/clipe_ladybug.mp4": {
    "n": 3,
    "base": "assets/video/clipe-ladybug-parte-",
    "type": "video/mp4"
  },
  "uploads/cocomelon_clip_cut.mp4": {
    "n": 3,
    "base": "assets/video/cocomelon-clipe-parte-",
    "type": "video/mp4"
  },
  "uploads/clipe_taina.mp4": {
    "n": 6,
    "base": "assets/video/clipe-taina-parte-",
    "type": "video/mp4"
  },
  "uploads/clipe_vovotata.mp4": {
    "n": 4,
    "base": "assets/video/clipe-vovo-tata-parte-",
    "type": "video/mp4"
  },
  "uploads/contosdoieti_clip.mp4": {
    "n": 4,
    "base": "assets/video/contos-do-ieti-clipe-parte-",
    "type": "video/mp4"
  },
  "uploads/preview.mp4": {
    "src": "assets/video/preview.mp4"
  },
  "uploads/Marina - dormir.webm": {
    "src": "assets/video/marina-dormir.webm"
  }
};
  var RX = /(^|['"(\s,])(?:\.\/)?((?:uploads|posters|icons)\/[^'"()\s,]+)/g;
  var RX2 = /(^|['"(\s,])(?:\.\/)?(?:uploads|posters|icons)\//;
  function norm(p){ try{ p = decodeURIComponent(p); }catch(e){} return p.replace(/^\.\//,'').replace(/[?#].*$/,''); }
  var warned = {};
  function R(v){
    if (typeof v !== 'string' || v.indexOf('/') < 0) return v;
    return v.replace(RX, function(all, pre, m){
      var k = norm(m);
      if (IMG[k]) return pre + IMG[k];
      if (VID[k] && VID[k].src) return pre + VID[k].src;
      if (!warned[k]) { warned[k] = 1; console.warn('[midia] nao encontrado:', k); }
      return all;
    });
  }
  window.__resolveAsset = R;
  var cache = {}, pend = {};
  window.__VIDPART = function(k, i, b64){ if (pend[k]) pend[k](i, b64); };
  function loadVid(k){
    if (cache[k]) return cache[k];
    var v = VID[k];
    cache[k] = new Promise(function(res, rej){
      var parts = new Array(v.n), got = 0;
      pend[k] = function(i, b64){
        var bin = atob(b64), u = new Uint8Array(bin.length);
        for (var j = 0; j < bin.length; j++) u[j] = bin.charCodeAt(j);
        parts[i] = u;
        if (++got === v.n) { delete pend[k]; res(URL.createObjectURL(new Blob(parts, {type: v.type}))); }
      };
      for (var i = 0; i < v.n; i++) {
        var s = document.createElement('script');
        s.src = v.base + (i + 1) + '.js'; s.onerror = rej;
        document.head.appendChild(s);
      }
    });
    return cache[k];
  }
  function wrapSetter(proto, prop, fn){
    var d = proto && Object.getOwnPropertyDescriptor(proto, prop);
    if (!d || !d.set) return;
    Object.defineProperty(proto, prop, { configurable: true, enumerable: d.enumerable, get: d.get,
      set: function(v){ fn.call(this, v, d.set); } });
  }
  var setProp = CSSStyleDeclaration.prototype.setProperty;
  function fixStyle(el){
    var st = el.style; if (!st) return;
    var css = el.getAttribute('style');
    if (!css || !RX2.test(css)) return;
    for (var i = st.length - 1; i >= 0; i--) {
      var n = st[i], v = st.getPropertyValue(n);
      if (v && RX2.test(v)) setProp.call(st, n, R(v), st.getPropertyPriority(n));
    }
  }
  function fixEl(el){
    if (el.nodeType !== 1) return;
    fixStyle(el);
    if ((el.tagName === 'IMG' || el.tagName === 'SOURCE') && RX2.test(el.getAttribute('src') || '')) el.src = el.getAttribute('src');
  }
  var mo = new MutationObserver(function(list){
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.type === 'attributes') fixEl(m.target);
      else for (var j = 0; j < m.addedNodes.length; j++) {
        var nd = m.addedNodes[j]; if (nd.nodeType !== 1) continue;
        fixEl(nd);
        var all = nd.querySelectorAll('[style],img,source');
        for (var k = 0; k < all.length; k++) fixEl(all[k]);
      }
    }
  });
  mo.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'src'] });
    CSSStyleDeclaration.prototype.setProperty = function(n, v, pr){ return setProp.call(this, n, R(v), pr); };
  function mediaSrc(v, set){
    var k = typeof v === 'string' ? norm(v) : '';
    var el = this;
    if (VID[k] && VID[k].n) {
      el.__want = k;
      loadVid(k).then(function(u){
        if (el.__want !== k) return;
        set.call(el, u);
        if (el.autoplay || el.__wantPlay) { var p = el.play(); if (p && p.catch) p.catch(function(){}); }
      });
      return;
    }
    el.__want = null;
    set.call(el, R(v));
  }
  wrapSetter(HTMLMediaElement.prototype, 'src', mediaSrc);
  wrapSetter(HTMLImageElement.prototype, 'src', function(v, set){ set.call(this, R(v)); });
  wrapSetter(HTMLSourceElement.prototype, 'src', function(v, set){ set.call(this, R(v)); });
  wrapSetter(HTMLVideoElement.prototype, 'poster', function(v, set){ set.call(this, R(v)); });
  var play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function(){
    if (this.__want && !this.currentSrc) { this.__wantPlay = true; return Promise.resolve(); }
    return play.apply(this, arguments);
  };
  var setAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(n, v){
    if (n === 'src' && this instanceof HTMLMediaElement) { this.src = v; return; }
    if (n === 'src' || n === 'poster' || n === 'href' || n === 'xlink:href' || n === 'style') v = R(String(v));
    return setAttr.call(this, n, v);
  };
  var setAttrNS = Element.prototype.setAttributeNS;
  Element.prototype.setAttributeNS = function(ns, n, v){
    if (n === 'href' || n === 'xlink:href') v = R(String(v));
    return setAttrNS.call(this, ns, n, v);
  };
})();
