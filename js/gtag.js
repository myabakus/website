if (location.host === 'www.myabakus.com') {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('js', new Date());
  gtag('config', 'AW-1042441796');
  gtag('config', 'UA-2211383-1');
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
