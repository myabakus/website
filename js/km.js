(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','_ga');
_ga('create', 'UA-2211383-1', 'auto');
_ga('require', 'GTM-W5PT3GW');
_ga('send', 'pageview');

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
