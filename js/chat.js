/*
const locale = document.querySelector('html').getAttribute('lang') || 'en';

! function () {
    var t;
    if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void(window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0,
        t.methods = ["identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on"],
        t.factory = function (e) {
            return function () {
                var n;
                return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
            };
        }, t.methods.forEach(function (e) {
            t[e] = t.factory(e);
        }), t.load = function (t) {
            var e, n, o, i;
            e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"),
                o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js",
                n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
        });
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.config({
  locale: locale
});
drift.load('33c7h6tzniik');
*/
// if (location.host === 'www.myabakus.com') {
  /*
  (function (lang) {
    const chats = {
      es: '9c5a371da42c74916eae026fa650687d',
      en: '2e23170fcf732bc2cbfb7ad31c323076'
    }
    !function(w,d,t,u){
      let e=d.createElement(t);
      e.async=!0;
      e.addEventListener('load', () => {
        if (typeof bento$ !== 'undefined') {
          const b = bento$; // no se debe remover esto no se que pasa con la minificacion.
          b(function() {
            bento.view();
            bento.showChat();
          });
        }
      });
      e.src=u;
      u=d.getElementsByTagName(t)[0];
      u.parentNode.insertBefore(e,u);
    }(window, document,'script','https://app.bentonow.com/' + chats[lang] + '.js');

  })(document.querySelector('html').getAttribute('lang') || 'en');
  */
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(lang){
  const chats = {
    en: '60479442385de407571e400b/1f0bpm9a0',
    es: '6047a7c91c1c2a130d66b16f/1f0buer15'
  };
  var s1=document.createElement("script"),
    s0=document.getElementsByTagName("script")[0];
   s1.async=true;
  s1.src='https://embed.tawk.to/' + chats[lang];
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
})(document.querySelector('html').getAttribute('lang') || 'en');
// }
