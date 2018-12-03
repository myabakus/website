<?php

use Web\Helper\Geo\Ip;

if(!$_POST) exit;


define('LIB_PATH', realpath(__DIR__ . '/../../../kernel') . '/');

const APP_PATH = LIB_PATH . 'web/';

const APP_CACHE = APP_PATH . 'storage/';

const APP_DATABASE = APP_PATH . 'database/';

require LIB_PATH . 'bootstrap/autoload/web.php';

Server::fromGlobal();

$name     = trim($_POST['name'] ?? '');
$email    = str_replace(' ', '', $_POST['email'] ?? ''); // remueve cualquier espacio en el numero de telefono
$phone    = trim($_POST['phone'] ?? '');
$lang     = $_POST['lang'] ?? 'en';
$countryCode = null;
$whatsapp = $_POST['whatsapp'] ?? false;


if($name == '') {
    error('enter_name');
}

if($email == '') {
    error('enter_email');
}

if(!isEmail($email)) {
    error('email_invalid');
}

if(!is_numeric($phone)) {
    error('enter_phone');
}

if ($phone) {
    $ip = Request::ip();
    if ($countryCode = Ip::country($ip)) {
        $phones = Config::get('phones');
        $dial = $phones[$countryCode];
        if ($dial) {
            if (strpos($phone, $dial . ' ') === 0) {
                $phone = '+' . $phone;
            } else {
                $phone = '+' . $dial . ' ' . $phone;
            }
        }
    }
}

$address = "help@myabakus.com";

$subject = $name . ' ' . _t('request_demo');

$whatsapp = $whatsapp ? _t('by') . ' WhatsApp' : null;

$body = _t('email_message', $name, $email, $whatsapp, $phone);

$headers = "From: $email" . PHP_EOL;
$headers .= "Reply-To: $email" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/html; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

if(mail($address, $subject, $body, $headers)) {
    die('<fieldset>' .
        '<div id="success_page">'.
            "<h2>" . _t('email_success') . '</h2>'.
            '<p>' . _t('email_thanks', $name) . '</p>' .
        '</div>'.
    '</fieldset>');
}

error('error');

function _t($key, ...$params) {
    global $lang;

    static $locales = [
        'en' => [
            'by' => 'by',
            'error' => 'ERROR!',
            'enter_name' => 'Please enter your name',
            'enter_email' => 'Please enter a valid email address',
            'enter_phone' => 'Phone number can only contain digits',
            'email_invalid' => 'You have entered an invalid e-mail address, try again',
            'request_demo' => 'requested a meeting.',
            'email_message' => "%s (%s) has requested a meeting from the website.\nHe/she can be contacted %s at %s",
            'email_success' => 'Request sent successfully',
            'email_thanks' => 'Thanks <strong>%s</strong>, we will get in touch you as soon as possible.'
        ],
        'es' => [
            'by' => 'por',
            'error' => 'ERROR!',
            'enter_name' => 'Por favor ingrese su nombre',
            'enter_email' => 'Por favor ingrese un email valido',
            'enter_phone' => 'El número de teléfono sólo puede contener caracteres numericos',
            'email_invalid' => 'Su email es invalido, por favor intente nuevamente.',
            'request_demo' => 'ha solicitado una reunión.',
            'email_message' => "%s (%s) ha solicitado una reunión desde el website.\nSe le puede contactar %s al %s",
            'email_success' => 'Solictud enviada correctamente',
            'email_thanks' => 'Gracias <strong>%s</strong>, nos pondremos en contacto lo antes posible.'
        ]
    ];

    $string = $locales[$lang][$key];
    if (count($params)) {
      $string = sprintf($string, ...$params);
    }

    return $string;
}

// Email address verification, do not edit.
function isEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function error($key) {
    die('<div class="error_message">' . _t($key) . '</div>');
}
