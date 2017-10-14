document.addEventListener('DOMContentLoaded', function() {
  scroll(0, 400);
}, false);

drift.on('ready',function(api, payload) {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName == 'A' && target.classList.contains('advisor')) {
      api.sidebar.open();
    }
  });
});
