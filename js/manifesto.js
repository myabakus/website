jQuery(document).ready(function(){
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
    $('#manifestoform').submit(function(){
        let isValid = true;
        for (let key of ['name', 'email', 'company']) {
            const el = $(`#${key}`);
            el.removeClass('is-invalid')
            if (el.val().trim() === '' || (key === 'email' && !isEmail(el.val()))){
                el.addClass('is-invalid');
                if (isValid) {
                    el.focus();
                }
                isValid = false;
            }
        }
        return isValid;
    });

});


