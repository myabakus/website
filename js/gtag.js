if (location.host === 'www.myabakus.com') {
  (function(w,d,s,l,i){
    w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5FMXZW');

  function gtag(event) {
    if (typeof dataLayer !== 'undefined') {
      event = 'event.'+ event;
      dataLayer.push({ 'event': event });
    }
  }

  (() => {
    if (document.location.search && sessionStorage !== null) {
      if (getUrlParam('gclid') && sessionStorage.getItem('_ga') === null) {
        const compaign = strip(getUrlParam('campaign'));
        const keyword = strip(getUrlParam('keyword'));
        const params = { compaign, keyword };
        sessionStorage.setItem('_ga', JSON.stringify(params));
      }
    }

    function getUrlParam(param) {
      var match = document.location.search.match('(?:\\?|&)' + param + '=([^&#]*)');
      return (match && match.length == 2) ? decodeURIComponent(match[1]) : '';
    }

    function strip(string) {
      return string.replace(/\+/g, ' ').trim().replace(/\s+\s/g, ' ');
    }
  })();
}
