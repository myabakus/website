// ==================
//    SIGNUP PLUGIN
// ==================

(function ($) {

  /* globals _kmq */

  'use strict';

  function _element(field) {
    return $('#' + field);
  }

  function $F(field) {
    return _element(field).val();
  }

  function _onChange(event) {
    /*jshint validthis: true */
    var
      value     = $(this).val().toLowerCase(),
      element   = _element('flag').get(0),
      className = element.className.trim(),
      pos       = className.lastIndexOf(' '),
      option    = this.options[this.selectedIndex],
      postCode  = option.getAttribute('post-code');

    className = className.substring(0, pos + 1);
    className += 'flag-icon-' + value;
    element.className = className;
    var
      empty = option.text === '',
      content = $(this).prev().text(option.text)[empty ? 'addClass' : 'removeClass']('placeholder');
    if (empty) {
      content.html(content.attr('placeholder'));
    }
    _element('currency_base').val($(option).attr('currency'));
    _element('code').html(postCode);
    _element('post_code').val(postCode);
    _element('phone').focus();
  }

  function _onFocus(event) {
    /*jshint validthis: true */
    $(this).parent().attr('focus', 'true');
  }

  function _onBlur(event) {
    /*jshint validthis: true */
    $(this).parent().removeAttr('focus');
  }

  function _getCountries() {
    var
      countries = {
        '': ['', '', ''],
        'AF': ['Afghanistan', 'AFN', ''],
        'AX': ['Åland Islands', 'EUR', ''],
        'AL': ['Albania', 'ALL', '355'],
        'DZ': ['Algeria', 'DZD', '213'],
        'AS': ['American Samoa', 'USD', ''],
        'AD': ['Andorra', 'EUR', '376'],
        'AO': ['Angola', 'AOA', '244'],
        'AI': ['Anguilla', 'XCD', ''],
        'AQ': ['Antarctica', 'AUD', ''],
        'AG': ['Antigua and Barbuda', 'XCD', '1 (268)'],
        'AR': ['Argentina', 'ARS', '54'],
        'AM': ['Armenia', 'AMD', '374'],
        'AW': ['Aruba', 'AWG', '297'],
        'AU': ['Australia', 'AUD', '61'],
        'AT': ['Austria', 'EUR', '43'],
        'AZ': ['Azerbaijan', 'AZN', '994'],
        'BS': ['Bahamas', 'BSD', '1 (242)'],
        'BH': ['Bahrain', 'BHD', '973'],
        'BD': ['Bangladesh', 'BDT', '880'],
        'BB': ['Barbados', 'BBD', '1 (246)'],
        'BY': ['Belarus', 'BYR', '375'],
        'BE': ['Belgium', 'EUR', '32'],
        'BZ': ['Belize', 'BZD', '501'],
        'BJ': ['Benin', 'XOF', '229'],
        'BM': ['Bermuda', 'BMD', '1 (441)'],
        'BT': ['Bhutan', 'BTN', '975'],
        'BO': ['Bolivia', 'BOB', '591'],
        'BQ': ['Bonaire Sint Eustatius and Saba', 'USD', ''],
        'BA': ['Bosnia and Herzegovina', 'BAM', '387'],
        'BW': ['Botswana', 'BWP', '267'],
        'BV': ['Bouvet Island', 'NOK', ''],
        'BR': ['Brazil', 'BRL', '55'],
        'IO': ['British Indian Ocean Territory', 'USD', ''],
        'BN': ['Brunei', 'BND', '673'],
        'BG': ['Bulgaria', 'BGN', '359'],
        'BF': ['Burkina Faso', 'XOF', '226'],
        'BI': ['Burundi', 'BIF', '257'],
        'KH': ['Cambodia', 'KHR', '855'],
        'CM': ['Cameroon', 'XAF', '237'],
        'CA': ['Canada', 'CAD', '1'],
        'IC': ['Canary Islands', 'EUR', ''],
        'CV': ['Cape Verde', 'CVE', '238'],
        'KY': ['Cayman Islands', 'KYD', '1 (345)'],
        'CF': ['Central African Republic', 'XAF', '236'],
        'TD': ['Chad', 'XAF', '235'],
        'CL': ['Chile', 'CLP', '56'],
        'CN': ['China', 'CNY', '86'],
        'CX': ['Christmas Island', 'AUD', ''],
        'CC': ['Cocos (Keeling) Islands', 'AUD', ''],
        'CO': ['Colombia', 'COP', '57'],
        'KM': ['Comoros', 'KMF', '269'],
        'CG': ['Congo', 'XAF', '242'],
        'CD': ['Congo, Dem. Republic', 'CDF', '243'],
        'CK': ['Cook Islands', 'NZD', ''],
        'CR': ['Costa Rica', 'CRC', '506'],
        'CI': ['Côte D\'ivoire', 'XOF', '225'],
        'HR': ['Croatia', 'HRK', '385'],
        'CU': ['Cuba', 'CUP', '53'],
        'CW': ['Curacao', 'ANG', ''],
        'CY': ['Cyprus', 'EUR', '357'],
        'CZ': ['Czech Republic', 'CZK', '420'],
        'DK': ['Denmark', 'DKK', '45'],
        'DJ': ['Djibouti', 'DJF', '253'],
        'DM': ['Dominica', 'XCD', '1 (767)'],
        'DO': ['República Dominicana', 'DOP', '1 (8)'],
        'EC': ['Ecuador', 'USD', '593'],
        'EG': ['Egypt', 'EGP', '20'],
        'SV': ['El Salvador', 'USD', '503'],
        'GQ': ['Equatorial Guinea', 'XAF', '240'],
        'ER': ['Eritrea', 'ERN', '291'],
        'ES': ['España', 'EUR', '34'],
        'EE': ['Estonia', 'EUR', '372'],
        'ET': ['Ethiopia', 'ETB', '251'],
        'FK': ['Falkland Islands', 'FKP', '500'],
        'FO': ['Faroe Islands', 'DKK', '298'],
        'FJ': ['Fiji', 'FJD', '679'],
        'FI': ['Finland', 'EUR', '358'],
        'FR': ['France', 'EUR', '33'],
        'GF': ['French Guiana', 'EUR', '594'],
        'PF': ['French Polynesia', 'XPF', '689'],
        'TF': ['French Southern Territories', 'EUR', ''],
        'GA': ['Gabon', 'XAF', '241'],
        'GM': ['Gambia', 'GMD', '220'],
        'GE': ['Georgia', 'GEL', '995'],
        'DE': ['Germany', 'EUR', '49'],
        'GH': ['Ghana', 'GHS', '233'],
        'GI': ['Gibraltar', 'GIP', '350'],
        'GR': ['Greece', 'EUR', '30'],
        'GL': ['Greenland', 'DKK', '299'],
        'GD': ['Grenada', 'XCD', '1 (473)'],
        'GP': ['Guadeloupe', 'EUR', '590'],
        'GU': ['Guam', 'USD', ''],
        'GT': ['Guatemala', 'GTQ', '502'],
        'GG': ['Guernsey', 'GBP', '44'],
        'GN': ['Guinea', 'GNF', '224'],
        'GW': ['Guinea-Bissau', 'XOF', '245'],
        'GY': ['Guyana', 'GYD', '592'],
        'HT': ['Haiti', 'HTG', '509'],
        'HM': ['Heard Island and McDonald Islands', 'AUD', ''],
        'HN': ['Honduras', 'HNL', '504'],
        'HK': ['HongKong', 'HKD', '852'],
        'HU': ['Hungary', 'HUF', '36'],
        'IS': ['Iceland', 'ISK', '354'],
        'IN': ['India', 'INR', '91'],
        'ID': ['Indonesia', 'IDR', '62'],
        'IR': ['Iran', 'IRR', '98'],
        'IQ': ['Iraq', 'IQD', '964'],
        'IE': ['Ireland', 'EUR', '353'],
        'IM': ['Isle of Man', 'GBP', '44'],
        'IL': ['Israel', 'ILS', '972'],
        'IT': ['Italy', 'EUR', '39'],
        'JM': ['Jamaica', 'JMD', '1 (876)'],
        'JP': ['Japan', 'JPY', '81'],
        'JE': ['Jersey', 'GBP', '44'],
        'JO': ['Jordan', 'JOD', '962'],
        'KZ': ['Kazakhstan', 'KZT', '7 7'],
        'KE': ['Kenya', 'KES', '254'],
        'KI': ['Kiribati', 'AUD', '686'],
        'KW': ['Kuwait', 'KWD', '965'],
        'KG': ['Kyrgyzstan', 'KGS', '996'],
        'LA': ['Laos', 'LAK', '856'],
        'LV': ['Latvia', 'LVL', '371'],
        'LB': ['Lebanon', 'LBP', '961'],
        'LS': ['Lesotho', 'LSL', '266'],
        'LR': ['Liberia', 'LRD', '231'],
        'LY': ['Libya', 'LYD', '218'],
        'LI': ['Liechtenstein', 'CHF', '423'],
        'LT': ['Lithuania', 'LTL', '370'],
        'LU': ['Luxembourg', 'EUR', '352'],
        'MO': ['Macao', 'MOP', '853'],
        'MK': ['Macedonia', 'MKD', '389'],
        'MG': ['Madagascar', 'MGA', '261'],
        'MW': ['Malawi', 'MWK', '265'],
        'MY': ['Malaysia', 'MYR', '60'],
        'MV': ['Maldives', 'MVR', '960'],
        'ML': ['Mali', 'XOF', '223'],
        'MT': ['Malta', 'EUR', '356'],
        'MH': ['Marshall Islands', 'USD', '692'],
        'MQ': ['Martinique', 'EUR', '596'],
        'MR': ['Mauritania', 'MRO', '222'],
        'MU': ['Mauritius', 'MUR', '230'],
        'YT': ['Mayotte', 'EUR', '262'],
        'MX': ['Mexico', 'MXN', '52'],
        'FM': ['Micronesia', 'USD', '691'],
        'MD': ['Moldova', 'MDL', '373'],
        'MC': ['Monaco', 'EUR', '377'],
        'MN': ['Mongolia', 'MNT', '976'],
        'ME': ['Montenegro', 'EUR', '382'],
        'MS': ['Montserrat', 'XCD', ''],
        'MA': ['Morocco', 'MAD', '212'],
        'MZ': ['Mozambique', 'MZN', '258'],
        'MM': ['Myanmar', 'MMK', '95'],
        'NA': ['Namibia', 'NAD', '264'],
        'NR': ['Nauru', 'AUD', '674'],
        'NP': ['Nepal', 'NPR', '977'],
        'NL': ['Netherlands', 'EUR', '31'],
        'AN': ['Netherlands Antilles', 'ANG', ''],
        'NC': ['New Caledonia', 'XPF', '687'],
        'NZ': ['New Zealand', 'NZD', '64'],
        'NI': ['Nicaragua', 'NIO', '505'],
        'NE': ['Niger', 'XOF', '227'],
        'NG': ['Nigeria', 'NGN', '234'],
        'NU': ['Niue', 'NZD', ''],
        'NF': ['Norfolk Island', 'AUD', ''],
        'KP': ['North Korea', 'KPW', '850'],
        'MP': ['Northern Mariana Islands', 'USD', ''],
        'NO': ['Norway', 'NOK', '47'],
        'OM': ['Oman', 'OMR', '968'],
        'PK': ['Pakistan', 'PKR', '92'],
        'PW': ['Palau', 'USD', '680'],
        'PS': ['Palestinian Territories', 'JOD', ''],
        'PA': ['Panama', 'PAB', '507'],
        'PG': ['Papua New Guinea', 'PGK', '675'],
        'PY': ['Paraguay', 'PYG', '595'],
        'PE': ['Peru', 'PEN', '51'],
        'PH': ['Philippines', 'PHP', '63'],
        'PN': ['Pitcairn', 'NZD', ''],
        'PL': ['Poland', 'PLN', '48'],
        'PT': ['Portugal', 'EUR', '351'],
        'PR': ['Puerto Rico', 'USD', '1'],
        'QA': ['Qatar', 'QAR', '974'],
        'RE': ['Réunion', 'EUR', '262'],
        'RO': ['Romania', 'RON', '40'],
        'RU': ['Russian Federation', 'RUB', '7'],
        'RW': ['Rwanda', 'RWF', '250'],
        'BL': ['Saint Barthélemy', 'EUR', '590'],
        'SH': ['Saint Helena', 'SHP', ''],
        'KN': ['Saint Kitts and Nevis', 'XCD', '1 (869)'],
        'LC': ['Saint Lucia', 'XCD', '1 (758)'],
        'MF': ['Saint Martin', 'EUR', '590'],
        'PM': ['Saint Pierre and Miquelon', 'EUR', '508'],
        'VC': ['Saint Vincent and the Grenadines', 'XCD', '1 (784)'],
        'WS': ['Samoa', 'WST', '685'],
        'SM': ['San Marino', 'EUR', '378'],
        'ST': ['São Tomé and Príncipe', 'STD', '239'],
        'SA': ['Saudi Arabia', 'SAR', '966'],
        'SN': ['Senegal', 'XOF', '221'],
        'RS': ['Serbia', 'RSD', '381'],
        'SC': ['Seychelles', 'SCR', '248'],
        'SL': ['Sierra Leone', 'SLL', '232'],
        'SG': ['Singapore', 'SGD', '65'],
        'SX': ['Sint Maarten', 'ANG', ''],
        'SK': ['Slovakia', 'EUR', '421'],
        'SI': ['Slovenia', 'EUR', '386'],
        'SB': ['Solomon Islands', 'SBD', '677'],
        'SO': ['Somalia', 'SOS', '252'],
        'ZA': ['South Africa', 'ZAR', '27'],
        'GS': ['South Georgia and the South Sandwich Islands', 'GBP', ''],
        'KR': ['South Korea', 'KRW', '82'],
        'SS': ['South Sudan', 'SSP', '211'],
        'LK': ['Sri Lanka', 'LKR', '94'],
        'SD': ['Sudan', 'SDG', '249'],
        'SR': ['Suriname', 'SRD', '597'],
        'SJ': ['Svalbard and Jan Mayen', 'NOK', '47'],
        'SZ': ['Swaziland', 'SZL', '268'],
        'SE': ['Sweden', 'SEK', '46'],
        'CH': ['Switzerland', 'CHW', '41'],
        'SY': ['Syria', 'SYP', '963'],
        'TW': ['Taiwan', 'TWD', '886'],
        'TJ': ['Tajikistan', 'TJS', '992'],
        'TZ': ['Tanzania', 'TZS', '255'],
        'TH': ['Thailand', 'THB', '66'],
        'TL': ['Timor-leste', 'USD', '670'],
        'TG': ['Togo', 'XOF', '228'],
        'TK': ['Tokelau', 'NZD', ''],
        'TO': ['Tonga', 'TOP', '676'],
        'TT': ['Trinidad and Tobago', 'TTD', '1 (868)'],
        'TN': ['Tunisia', 'TND', '216'],
        'TR': ['Turkey', 'TRY', '90'],
        'TM': ['Turkmenistan', 'TMT', '993'],
        'TC': ['Turks and Caicos Islands', 'USD', '1 (649)'],
        'TV': ['Tuvalu', 'AUD', '688'],
        'UG': ['Uganda', 'UGX', '256'],
        'UA': ['Ukraine', 'UAH', '380'],
        'AE': ['United Arab Emirates', 'AED', '971'],
        'GB': ['United Kingdom', 'GBP', '44'],
        'US': ['United States', 'USD', '1'],
        'UM': ['United States Minor Outlying Islands', 'USD', ''],
        'UY': ['Uruguay', 'UYU', '598'],
        'UZ': ['Uzbekistan', 'UZS', '998'],
        'VU': ['Vanuatu', 'VUV', '678'],
        'VA': ['Vatican City State', 'EUR', '39 (066)'],
        'VE': ['Venezuela', 'VEF', '58'],
        'VN': ['Vietnam', 'VND', '84'],
        'VG': ['Virgin Islands (British)', 'USD', '1 (284)'],
        'VI': ['Virgin Islands (U.S.)', 'USD', ''],
        'WF': ['Wallis and Futuna', 'XPF', '681'],
        'EH': ['Western Sahara', 'MAD', '212'],
        'YE': ['Yemen', 'YER', '967'],
        'ZM': ['Zambia', 'ZMK', '260'],
        'ZW': ['Zimbabwe', 'ZWL', '263']
      },
      countryHTML = '<span class="ss placeholder"></span><select name="country_id" id="country_id" class="box">',
      country,
      code;
    for (code in countries) {
      country = countries[code];
      if (country[2]) {
        country[2] = '+' + country[2];
      }
      countryHTML += '<option value="' + code + '" currency="' + country[1] + '" post-code="' + country[2] + '">' + country[0] + '</option>';
    }

    countryHTML += '</select>';

    return countryHTML;
  }


  var _validate = (function () {

    function isEmail(field) {
      var
        val = $F(field),
        regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regx.test(val);
    }

    function isEmpty(field) {
      var val = $F(field);
      if (val) {
        val = $.trim(val);
      }
      return val === '';
    }

    function _reset(field) {
      _field(field).removeAttr('required');
    }

    function requiredLength(field) {
        return _field(field).val().length > 5;
    }

    return function () {
      var empty = $.grep(
        [
        'company_name',
        'country_id',
        'name',
        'email',
        'password'
        ],
        function (field) {
          _reset(field);
          return isEmpty(field) || (field === 'email' && !isEmail(field)) || (
            field == 'password' && !requiredLength(field)
          );
        }
      );

      return empty.length > 0 ? empty[0] : true;
    };
  })();

  function _field(field) {
    var $this = _element(field);
    if (field === 'country_id') {
      $this = $this.parent();
    }
    return $this;
  }

  function _required(field) {
    var $this = _field(field);
    $this.attr('required', 'true');
    if ($this.prop('tagName') == 'SPAN') {
        $this = _element(field);
    }
    $this.focus();
  }

  var _request = (function () {
    var
      lang = $('html').attr('lang'),
      errors = {
        en: 'A technical problem occurred during the setup. ' +
                     'Please accept our apologies and try again.',
        es: 'Un problema técnico ha ocurrido durante el registro . ' +
                     'Por favor acepte nuestras disculpas e inténtelo de nuevo.'
      },
      logins = {
        en: 'login',
        es: 'ingrese'
      };

    function _response(data) {
      try {
        var response = data;
        if (!$.isPlainObject(response)) {
          response = $.parseJSON(data);
        }
        if (!$.isPlainObject(response)) {
          throw 'Invalid data';
        }
        return response;
      } catch (e) {
        return {
          error: true,
          info: errors[lang]
        };
      }
    }

    function _getLogger() {
      if (!$('#logger').length) {
        $('.container').append('<div id="logger" class="log" style="display:none"/>');
      }

      return $('#logger');
    }

    function _logger(response) {
      var info = response.info,
        errorClass = response.down ? 'warn' : 'error';
      _getLogger().html('<span class="log-' + errorClass + '"></span>' + info).fadeIn('slow');
      _element('enter').blur();
    }

    function _overaly(action, callback) {
      _getLogger().hide();
      $('#overaly').overlay(action, callback);
    }

    /*
    function _KM_Event(name, options) {
        options = options || {};
        try {
          _kmq.push(['record', name, options]);
        } catch (e) {
        }
    }

    function _KM_Identify(id) {
      if (typeof (_kmq) !== 'undefined' && typeof(id) !== 'undefined') {
        _kmq.push(['identify', id]);
      }
    }
    */

    function _getGAVar(name) {
      let ga;
      if (typeof sessionStorage === 'undefined' || (ga = sessionStorage.getItem('_ga')) === null) {
        return '';
      }
      try {
        ga = JSON.parse(ga);
        return ga[name] || '';
      } catch (e) {
        return '';
      }
    }

    function done(data) {
      var response = _response(data);
      if (response.done) {
        if (typeof _ga === 'function') {
          _ga('send', 'pageview', '/account/created');
        }
        var login = '/app/' + (logins.hasOwnProperty(lang) ? logins[lang] : logins['en']);
        const path = $.route(login, true);
        $.ajax({
            type: 'POST',
            url: path,
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify({ token: response.token })
        }).done(request => {
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {'send_to': 'AW-1042441796/b37-CJaASRDEzInxAw'});
            }
            setTimeout(() => {
                const res = _response(request);
                location.href = res.returnPath;
            }, 3000);
        }).fail(re => {
            location.href = path;
        });
      } else {
        _overaly('hide', $.proxy(_logger, null, response));
        if (response.bounce) {
          _element('password').val('');
          _element('email').val('').focus();
        } else if (response.exist) {
          _element('password').val('').focus();
        }
      }
    }

    function fail(req) {
      var response = _response(req.responseText);
      _overaly('hide', $.proxy(_logger, null, response));
    }

    return function (field) {
      _overaly('show');
      var $form = _element(field);
      _element('campaign').val(_getGAVar('campaign'));
      _element('keyword').val(_getGAVar('keyword'));
      $.post($.route('/app/signup', true), $form.serialize())
           .done(done)
           .fail(fail);
    };
  })();

  function _submit(event) {
    var field;
    if ((field = _validate()) === true) {
      _request('signup_form');
    } else {
      _required(field);
    }
    event.preventDefault();
  }

  function _keyup(event) {
    var keyChar = String.fromCharCode(event.which),
        regex   = /[\s\+\-\(\)0-9a-zA-Z]/;
    if (!regex.test(keyChar)) {
      event.preventDefault();
    }
    // console.log(event.type + ": " + event.keyCode + ' -> ' + );
    // console.log(event);
  }

  function _observe() {
    var countries = {
        colombia: 'CO',
        venezuela: 'VE',
        argentina: 'AR',
        bolivia: 'BO',
        chile: 'CL',
        'costa-rica': 'CR',
        ecuador: 'EC',
        espana: 'ES',
        mexico: 'MX',
        panama: 'PA',
        paraguay: 'PY',
        peru: 'PE',
        uruguay: 'UY',
        'estados-unidos':'US',
        'republica-dominicana': 'DO'
    };
    // Anexamos evento para cuando se cambia el pais
    var referrer = document.referrer, code = '';

    for (var name in countries) {
        if (referrer.indexOf(name) !== -1) {
            code = countries[name];
            break;
        }
    }

    _element('country_id').change($.proxy(_onChange))
                    .focus(_onFocus)
                    .blur(_onBlur)
                    .val(code)
                    .trigger('change');

    _element('enter').on('click', _submit);

    _element('signup_form').on('submit', _submit);

    _element('phone').on('keypress', _keyup);
  }

  function Plugin() {
    _element('language').val($('html').attr('lang'));
    _element('country_id').html(_getCountries());
    _observe();
    _element('company_name').focus();
  }


  var old = $.signup;

  $.signup = Plugin;


  // SIGNUP NO CONFLICT
  // =================

  $.signup.noConflict = function () {
    $.signup = old;
    return this;
  };

})(jQuery);


// ==================
//    OPEN PLUGIN
// ==================

(function ($, location) {

  'use strict';

  function Plugin(path, ssl) {
    var host = location.hostname,
        protocol = ssl && host.indexOf('myabakus.org') === -1 ? 'https' : 'http';
    return protocol + '://' + host + path;
  }

  var old = $.route;

  $.route = Plugin;

  // ROUTE NO CONFLICT
  // =================

  $.route.noConflict = function () {
    $.route = old;
    return this;
  };

}(jQuery, location));


// ==================
//    OPEN PLUGIN
// ==================

(function ($, location, window) {

  'use strict';

  function Plugin(path, target) {
    target = target || '_self';
    window.open($.route(path), target);
  }

  var old = $.open;

  $.open = Plugin;

  // SIGNUP NO CONFLICT
  // =================

  $.open.noConflict = function () {
    $.open = old;
    return this;
  };

}(jQuery, location, window));

// ==================
//    HELP PLUGIN
// ==================

(function ($) {

  'use strict';

  var
    translate = {
      es: {
        'faqs': 'preguntas',
        'what': 'que',
        'trial': 'prueba',
        'cost': 'costo',
        'guarantee': 'garantia',
        'country': 'pais'
      }
    };

  function __(lang, key) {
    var value = key;
    if (translate.hasOwnProperty(lang) && translate[lang][key]) {
      value = translate[lang][key];
    }

    return value;
  }

  function Plugin(hash, givePath) {
    var
      lang = $('html').attr('lang'),
      path = '/help/' + __(lang, 'faqs') + '.html#' + __(lang, hash);
    if (givePath) {
      return path;
    }
    $.open(path);
  }

  var old = $.help;

  $.help = Plugin;

  // HELP NO CONFLICT
  // =================

  $.help.noConflict = function () {
    $.help = old;
    return this;
  };

}(jQuery));

// ==================
//    OVERLAY PLUGIN
// ==================

(function () {

  'use strict';

  var $control;

  function hide(callback) {
    $('#loader').fadeOut();
    $control.fadeOut({
      start: callback
    });
    return this;
  }

  function show(callback){
    $control = $('#overlay');
    if(!$control.length) {
      $(document.body).append('<div id="overlay" style="display:none"/>');
      $(document.body).append('<div id="loader" style="display:none"/>');
      $control = $('#overlay');
    }
    if ($control.is(':hidden')) {
      $('#loader').fadeIn('slow');
      $control.fadeIn('slow', callback);
    }

    return this;
  }

  function Plugin(action, callback) {
    callback = callback || $.noop();
    return action === 'show' ? show(callback) : hide(callback);
  }

  var old = $.fn.overlay;

  $.fn.overlay = Plugin;

  // OVERALY NO CONFLICT
  // =================

  $.fn.overlay.noConflict = function () {
    $.fn.overlay = old;
    return this;
  };

}());


// READY

jQuery(function($) {

  'use strict';

  $.signup();

});
