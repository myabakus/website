document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('#pricing + .content-block');
  if (element !== null) {
    element.scrollIntoView(true);
  }
}, false);

drift.on('ready',function(api, payload) {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName == 'A' && target.classList.contains('advisor')) {
      api.sidebar.open();
    }
  });
});
