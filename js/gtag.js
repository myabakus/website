// https://www.myabakus.com/colombia?utm_source=Facebook&utm_medium=fb&utm_campaign=23846023121650183&utm_content=23847154742320183&utm_term=Nuevo%20anuncio&fbclid=IwAR2XTgWSVrIn1rQznHWcKrLbl2R6GAWblVllKZRaCy4knmbQdoDOWzZGKXo
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
      const isAds = getUrlParam('gclid') || getUrlParam('fbclid');;
      if (isAds && sessionStorage.getItem('_ga') === null) {
        const campaign = getUrlParam('utm_campaign');
        const keyword = getUrlParam('utm_term') || getUrlParam('utm_keyword');
        const source = getUrlParam('utm_source').toLowerCase();
        const params = { campaign, keyword: source + ': ' + keyword };
        sessionStorage.setItem('_ga', JSON.stringify(params));
      }
    }

    function getUrlParam(param) {
      var match = document.location.search.match(param + '=([^&#]*)');
      return (match && match.length == 2) ? strip(decodeURIComponent(match[1])) : '';
    }

    function strip(string) {
      return string.replace(/\+/g, ' ').trim().replace(/\s+\s/g, ' ');
    }
  })();
}
