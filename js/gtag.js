if (location.host === 'www.myabakus.com') {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  const script =  function(b,e,v,t,s){
    t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  };
  !function(f,n)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];}(window);
  gtag('js', new Date());
  for (const id of ['AW-1042441796', 'UA-2211383-1', 'G-NGVVQH0Q1V']) {
    script(document, 'script', 'https://www.googletagmanager.com/gtag/js?id=' + id);
    gtag('config', id);
  }
  script(document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '2643049546010302');
  fbq('track', 'PageView');
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
