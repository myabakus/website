if (location.host === 'www.myabakus.com') {
  !function(w,d,t,u){
    if (w.LogRocket) return;
    let e=d.createElement(t);
    e.async=!0;
    e.addEventListener('load', () => {
      if (w.LogRocket) LogRocket.init('kzmvgk/myabakus');
    });
    e.src=u;
    u=d.getElementsByTagName(t)[0];
    u.parentNode.insertBefore(e,u);
  }(window, document,'script','https://cdn.lr-ingest.io/LogRocket.min.js');
}
