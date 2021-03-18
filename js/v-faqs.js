Vue.createApp({
  data () { return data },
  mounted (h) {
      const hash = location.hash;
      if (hash) {
          const element = this.$el.querySelector('a[href="' + hash + '"]');
          if (element !== null) {
              setTimeout(function () {
                  element.click();
              }, 10);
          }
      }
  }
}).mount('#app');



