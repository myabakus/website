<?php
namespace{
use App\Exception as AppException;
function cache_get($id){
$filename=APP_CACHE.$id.'.sz';
if(file_exists($filename)&&false!==($data=file_get_contents($filename))){
if(false===($data=unserialize($data))){
$data=array();
}
}else{
$data=array();
}
return $data;
}
function cache_set($id,$data){
$_save=false;
$filename=APP_CACHE.$id.'.sz';
$data=serialize($data);
$dirname=dirname($filename);
if(!($is_dir=is_dir($dirname))){
try{
$is_dir=mkdir($dirname,0770,true);
chmod($dirname,0770);
}catch(Exception $e){
$is_dir=false;
}
}
if($is_dir){
$_tmp_file=APP_CACHE.'cache/'.uniqid('wrt').'.tmp';
try{
$_save=false!==file_put_contents($_tmp_file,$data)&&rename($_tmp_file,$filename);
}catch(Exception $e){
$_save=false;
}
if($_save){
try{
@chmod($filename,0644);
}catch(Exception $e){
}
}else{
try{
!file_exists($_tmp_file)||unlink($_tmp_file);
}catch(Exception $e){
}
try{
!file_exists($filename)||unlink($filename);
}catch(Exception $e){
}
}
}
return $_save;
}
function cache_clear($id){
$filename=APP_CACHE.$id.'.sz';
if(file_exists($filename)){
unlink($filename);
}
}
function http_response($data){
if($data['caching']&&Request::isMethod('get')&&!App::env('dev')){
$gzip=(int)strpos(Request::header('accept_encoding'),'gzip')!==false;
$client_etag=stripslashes(Request::header('if_none_match'));
if($gzip){
apache_setenv('no-gzip','1');
if($data['gzip']){
header('Content-Encoding: gzip');
}elseif(false!==($compress=gzencode($data['body'],9,FORCE_GZIP))){
header('Content-Encoding: gzip');
$data['body']=$compress;
unset($compress);
}else{
$gzip=0;
}
}elseif($data['gzip']){
$data['body']=gzinflate(substr(substr($data['body'],10),0,-8));
}
$server_etag='"'.md5($data['body'].'-'.$gzip).'"';
header('Cache-Control: private, max-age=0, must-revalidate');
header('Etag: '.$server_etag);
if($client_etag&&$client_etag==$server_etag){
http_response_code(304);
return;
}
}elseif(!empty($data['gzip'])){
$data['body']=gzinflate(substr(substr($data['body'],10),0,-8));
}
return $data['body'];
}
function __(...$args){
if(is_array($args[0])){
$args=$args[0];
}
return Lang::translate(...$args);
}
function _e($key1,$key2=null,$key3=null,$key4=null,$key5=null,$key6=null){
if(null!==$key6){
echo __($key1,$key2,$key3,$key4,$key5,$key6);
}elseif(null!==$key5){
echo __($key1,$key2,$key3,$key4,$key5);
}elseif(null!==$key4){
echo __($key1,$key2,$key3,$key4);
}elseif(null!==$key3){
echo __($key1,$key2,$key3);
}elseif(null!==$key2){
echo __($key1,$key2);
}else{
echo __($key1);
}
}
function _a($key){
return Lang::translate($key);
}
function uuid(){
if(function_exists('com_create_guid')){
return strtolower(str_replace(array('{','}'),'',com_create_guid()));
}else{
mt_srand((double)microtime()*10000);
$charid=md5(uniqid(rand(),true));
$hyphen=chr(45);
$uuid=substr($charid,0,8) .$hyphen.substr($charid,8,4) .$hyphen.substr($charid,12,4) .$hyphen.substr($charid,16,4) .$hyphen.substr($charid,20,12);
return strtolower($uuid);
}
}
function uuid_encode($id=null){
return str_replace('-','',$id);
}
function uuid_decode($id){
$uuid=$id;
if(strlen($id)==32&&preg_match('/[a-z0-9]/i',$uuid)){
$hyphen=chr(45);
$uuid=substr($uuid,0,8) .$hyphen.substr($uuid,8,4) .$hyphen.substr($uuid,12,4) .$hyphen.substr($uuid,16,4) .$hyphen.substr($uuid,20,12);
}
return $uuid;
}
function s($s){
$s=htmlspecialchars(stripslashes($s));
return $s;
}
function r($s,$l=50){
if(is_numeric($l)){
$s=htmlspecialchars_decode($s,ENT_QUOTES);
if(mb_strlen($s)>$l){
$s=mb_substr($s,0,$l-3) .'...';
}
$s=htmlspecialchars($s,ENT_QUOTES,'UTF-8');
}
return $s;
}
function _eIf($condition,$done,$fail=null){
echo _if($condition,$done,$fail);
}
function _if($condition,$done,$fail=null){
return($condition?$done:$fail);
}
function _unless($condition,$done,$fail=null){
return(!$condition?$done:$fail);
}
function _class($condition,$class,$append=false){
$fail=null;
if(is_array($class)){
list($class,$failClass)=$class;
$fail=' '.($append?$failClass:'class="'.$failClass.'"');
}
$done=' '.($append?$class:'class="'.$class.'"');
return _if($condition,$done,$fail);
}
function _style($condition,$class,$append=false){
return _if($condition,' '.($append?$class:'style="'.$class.'"'));
}
function _attr($name,$value=1){
return ' '.$name.'="'.$value.'"';
}
function _attr_if($condition,$name,$value=1){
return _if($condition,_attr($name,$value));
}
function _display_none($condition,$append=false){
return _style($condition,'display:none',$append);
}
function is_date($date){
if(empty($date)){
return false;
}
if(($i=strpos($date,' '))!==false){
if(false===strtotime($date)){
return false;
}
$date=substr($date,0,$i);
}
$date=str_replace('-','/',$date);
$date=explode('/',$date);
return((count($date)==3&&is_numeric($date[0])&&is_numeric($date[1])&&is_numeric($date[2]))&&((strlen($date[2])>=4&&$date[2]>=1969&&(checkdate($date[0],$date[1],$date[2])||checkdate($date[1],$date[0],$date[2])))||(strlen($date[0])>=4&&$date[0]>=1969&&checkdate($date[1],$date[2],$date[0]))));
}
function is_email($val){
return filter_var($val,FILTER_VALIDATE_EMAIL);
}
function strip_space($val,$onlyWhitespace=false){
$regex=$onlyWhitespace?'( )( )':'\s';
return trim(preg_replace('/'.$regex.'+/u',' ',$val));
}
function php_is_cli(){
return PHP_SAPI=='cli';
}
function auto_prefix($type,$number){
static $prefix=array(Constant::TRANSACTION_INCOME=>'I-',Constant::TRANSACTION_INCOME_CREDITS=>'NC-',Constant::TRANSACTION_EXPENSE=>'E-',Constant::TRANSACTION_EXPENSE_CREDITS=>'NC-',);
if(is_numeric($number)){
return $prefix[$type].$number;
}
return $number;
}
if(!function_exists('str_random')){
function str_random($length){
$bytes=openssl_random_pseudo_bytes(2*$length);
if($bytes!==false){
$random=substr(str_replace(array('/','+','='),'',base64_encode($bytes)),0,$length);
}else{
$pool='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$random=substr(str_shuffle(str_repeat($pool,5)),0,$length);
}
return $random;
}
}
if(!function_exists('e')){
function e($value){
return htmlentities($value,ENT_QUOTES,'UTF-8',false);
}
}
if(!function_exists('array_flatten')){
function array_flatten($array){
$return=array();
array_walk_recursive($array,function($x)use(&$return){
$return[]=$x;
});
return $return;
}
}
if(!function_exists('array_set')){
function array_set(&$array,$key,$value){
if(is_null($key)){
return $array=$value;
}
$keys=explode('.',$key);
while(count($keys)>1){
$key=array_shift($keys);
if(!isset($array[$key])||!is_array($array[$key])){
$array[$key]=[];
}
$array=&$array[$key];
}
$array[array_shift($keys)]=$value;
return $array;
}
}
if(!function_exists('array_get')){
function array_get($array,$key,$default=null){
if(is_null($key)){
return $array;
}
if(isset($array[$key])){
return $array[$key];
}
foreach(explode('.',$key)as $segment){
if(!is_array($array)||!array_key_exists($segment,$array)){
return $default;
}
$array=$array[$segment];
}
return $array;
}
}
function search_option($value,$option){
if(($search=strtok($value,':'))!==false&&strcasecmp($search,$option)==0){
return strtok(':');
}
}
if(!function_exists('view')){
function view($name,$data=[]){
return View::make($name,false)->assign($data);
}
}
if(!function_exists('layout')){
function layout($name='default',Closure $callback=null){
return Layout::make($name,$callback);
}
}
if(!function_exists('array_only')){
function array_only($array,...$keys){
if(is_array($keys[0])){
$keys=$keys[0];
}
return array_intersect_key($array,array_flip($keys));
}
}
if(!function_exists('value')){
function value($value){
return $value instanceof Closure?$value():$value;
}
}
if(!function_exists('array_get')){
function array_get($array,$key,$default=null){
if(is_null($key)){
return $array;
}
if(isset($array[$key])){
return $array[$key];
}
foreach(explode('.',$key)as $segment){
if(!is_array($array)||!array_key_exists($segment,$array)){
return value($default);
}
$array=$array[$segment];
}
return $array;
}
}
if(!function_exists('array_forget')){
function array_forget(&$array,$keys){
$original=&$array;
$keys=(array)$keys;
if(count($keys)===0){
return;
}
foreach($keys as $key){
$parts=explode('.',$key);
$array=&$original;
while(count($parts)>1){
$part=array_shift($parts);
if(isset($array[$part])&&is_array($array[$part])){
$array=&$array[$part];
}else{
continue 2;
}
}
unset($array[array_shift($parts)]);
}
}
}
if(!function_exists('array_pull')){
function array_pull(&$array,$key,$default=null){
$value=array_get($array,$key,$default);
array_forget($array,$key);
return $value;
}
}
if(!function_exists('array_first')){
function array_first($array,callable $callback,$default=null){
foreach($array as $key=>$value){
if(call_user_func($callback,$key,$value)){
return $value;
}
}
return value($default);
}
}
if(!function_exists('request')){
function request($key=null,$default=null){
if($key===null){
return Input::all();
}
return Input::get($key,$default);
}
}
if(!function_exists('session')){
function session($key=null,$default=null){
if(is_array($key)){
return Session::set($key);
}
return Session::get($key,$default);
}
}
function dotenv($path){
Dotenv\Dotenv::create($path)->load();
}
if(!function_exists('array_except')){
function array_except($array,$keys){
$original=&$array;
$keys=(array)$keys;
if(count($keys)===0){
return;
}
foreach($keys as $key){
$parts=explode('.',$key);
$array=&$original;
while(count($parts)>1){
$part=array_shift($parts);
if(isset($array[$part])&&is_array($array[$part])){
$array=&$array[$part];
}else{
continue 2;
}
}
unset($array[array_shift($parts)]);
}
return $array;
}
}
if(!function_exists('array_column_recursive')){
function array_column_recursive(array $input,$column_key,$index_key=null){
$rows=[];
foreach($input as $index=>$array){
if(is_numeric($index)){
$rows=array_merge($rows,array_column($array,$column_key,$index_key));
}else{
$rows=array_merge($rows,array_column($input,$column_key,$index_key));
}
}
return $rows;
}
}
if(!function_exists('array_has')){
function array_has($array,$key){
if(empty($array)||is_null($key)){
return false;
}
if(array_key_exists($key,$array)){
return true;
}
foreach(explode('.',$key)as $segment){
if(!is_array($array)||!array_key_exists($segment,$array)){
return false;
}
$array=$array[$segment];
}
return true;
}
}
function array_sort_by(array&$data,$columnName,$newKey=true){
$sort=$newKey?'usort':'uasort';
$sort($data,function($a,$b)use($columnName){
$a=array_get($a,$columnName);
$b=array_get($b,$columnName);
return strcasecmp($a,$b);
});
return $data;
}
function array_group_by(array $array,$columnName){
$newArray=[];
foreach($array as $value){
$id=array_pull($value,$columnName);
$newArray[$id]=$value;
}
return $newArray;
}
function array_collection_by(array $array,$columnName){
$newArray=[];
foreach($array as $value){
$id=array_pull($value,$columnName);
$newArray[$id][]=$value;
}
return $newArray;
}
if(!function_exists('encrypt')){
function encrypt($content){
return(new Encrypter(getenv('APP_KEY'),getenv('APP_CIPHER')))->encrypt($content);
}
}
if(!function_exists('decrypt')){
function decrypt($content){
return(new Encrypter(getenv('APP_KEY'),getenv('APP_CIPHER')))->decrypt($content);
}
}
if(!function_exists('array_rdiff')){
function array_rdiff($array1,$array2){
$intersects=array_intersect($array1,$array2);
return array_filter($array2,function($value)use($intersects){
return!in_array($value,$intersects);
});
}
}
function studly_reverse($value,$separator=''){
$matches=[];
if(preg_match_all('/(?:[A-Z]+[a-z]+)/',$value,$matches)){
$value=implode($separator,array_reverse($matches[0]));
}
return $value;
}
if(!function_exists('array_assoc')){
function array_assoc(array $array){
$keys=array_keys($array);
return array_keys($keys)!==$keys;
}
}
if(!function_exists('studly_case')){
function studly_case($value){
$value=ucwords(str_replace(['-','_'],' ',$value));
return str_replace(' ','',$value);
}
}
if(!function_exists('camel_case')){
function camel_case($value){
return lcfirst(studly_case($value));
}
}
if(!function_exists('array_camel_case')){
function array_camel_case($array){
$data=[];
foreach($array as $key=>$value){
$key=camel_case($key);
$data[$key]=$value;
}
return $data;
}
}
if(!function_exists('snake_case')){
function snake_case($value,$delimiter='_'){
static $snakeCache=[];
$key=$value.$delimiter;
if(isset($snakeCache[$key])){
return $snakeCache[$key];
}
if(!ctype_lower($value)){
$value=preg_replace('/\s+/','',$value);
$value=strtolower(preg_replace('/(.)(?=[A-Z])/','$1'.$delimiter,$value));
}
return $snakeCache[$key]=$value;
}
}
if(!function_exists('array_remove')){
function array_remove(array&$array,...$values){
foreach($values as $value){
if(($key=array_search($value,$array))!==false){
unset($array[$key]);
}
}
return $array;
}
}
if(!function_exists('str_slug')){
function str_slug($title,$separator='-'){
$title=Str::ascii($title);
$flip=$separator=='-'?'_':'-';
$title=preg_replace('!['.preg_quote($flip).']+!u',$separator,$title);
$title=preg_replace('![^'.preg_quote($separator).'\pL\pN\s]+!u','',mb_strtolower($title));
$title=preg_replace('!['.preg_quote($separator).'\s]+!u',$separator,$title);
return trim($title,$separator);
}
}
if(!function_exists('array_each')){
function array_each(&$array){
$key=key($array);
if($key===null){
return false;
}
$value=current($array);
next($array);
return [$key,$value];
}
}
function versioned($directory,$file){
return '/'.$directory.App::path('/'.Versioned::out($file,true));
}
class App{
protected static $name='app';
protected static $locale='en';
public static $module;
public static function run($name='app'){
$controller=null;
try{
list($controller,$response)=static::start($name);
}catch(AppException\HttpResponseException $e){
$response=$e->getResponse();
}catch(DB\ConnectionException $e){
return static::logout('not_connection');
}catch(AppException\MaintenanceException $e){
return static::logout();
}catch(Exception $e){
http_response_code(500);
throw $e;
}
static::send($controller,$response);
}
public static function start($name='app'){
static::$name=$name;
dotenv(LIB_PATH);
Server::fromGlobal();
if(!Request::isMethod('GET')&&Request::isJson()){
Input::fromJson();
}else{
Input::fromGlobal();
}
Cookie::fromGlobal();
$route=Router::match(URL::current());
static::$module=$route['module'];
$controller=static::getController($route);
if(!$controller->skipMaintenance){
static::checkForMaintenanceMode();
}
$params=static::getParams($route);
if((bool) getenv('APP_DEBUG')){
DB_Debug::init();
}
return [$controller,$controller->dispatch($route['action'].'Action',$params)];
}
private static function getController(array $data){
$controller=$data['controller'].'Controller';
$ignore=false;
if(strpos($controller,'\\')!==false&&($ignore=strpos($controller,'Controllers'))===false){
$controller="Controller\\$controller";
}
if(!App::env('dev')&&!$ignore){
$data['controller']=str_replace('\\','/',$data['controller']);
$action=ucfirst($data['action']);
require APP_CACHE.'Controller'.'/'.studly_reverse($data['controller'],'/').'/'.$action.'.php';
$controller=$action.$controller;
}
return new $controller($data['action']);
}
private static function getParams(array $data){
$params=isset($data['params'])?$data['params']:[];
unset($data['controller'],$data['module'],$data['params'],$data['action']);
foreach($params as $name=>$value){
if(is_numeric($value)){
$params[$name]=(int)$value;
}
}
if($data){
foreach($data as $key=>$val){
Input::set($key,$val);
}
}
return array_values($params);
}
public static function path($path=''){
return '/'.static::$name.$path;
}
public static function env($name=null){
$env=getenv('APP_ENV');
return is_null($name)?$env:strtoupper($name)==$env;
}
public static function __callStatic($method,$parameters){
static $register=false;
if(!$register){
$register=StaticMethod::register(__CLASS__,APP_PATH.'Helper');
}
return StaticMethod::call(__CLASS__,$method,$parameters);
}
public static function id(){
return Myabakus::$companyId;
}
private static function closeOutputBuffers(){
$status=ob_get_status(true);
$level=count($status);
$flags=PHP_OUTPUT_HANDLER_FLUSHABLE;
while($level-->0&&($s=$status[$level])&&(!isset($s['del'])?!isset($s['flags'])||$flags===($s['flags']&$flags):$s['del'])){
ob_end_flush();
}
}
public static function config($name){
$config=Config::get($name);
$config=$config[static::id()];
return is_array($config)?(new Config\Repository($config)):$config;
}
public static function setLocale($locale){
static::$locale=Lang::get($locale);
}
public static function getLocale(){
return static::$locale;
}
public static function name($name=null){
if($name!==null){
static::$name=$name;
}
return static::$name;
}
public static function is($id){
return in_array(static::id(),(array)$id);
}
public static function isModule($id){
return in_array(static::$module,(array)$id);
}
public static function isDownForMaintenance(){
return(int)getenv('APP_DOWN');
}
private static function checkForMaintenanceMode(){
if($code=static::isDownForMaintenance()){
http_response_code(503);
if($code==1||($code==2&&!Request::isMethod('GET'))){
if(Request::ajax()){
static::langError();
Json::error(['down'=>true,'info'=>__('app_down')]);
}
throw new AppException\MaintenanceException;
}
}
}
protected static function send($controller,$response){
if($response){
if(is_object($response)){
if($response instanceof Layout){
if($response->preload instanceof Closure){
$response->bindTo($controller);
if(!php_is_cli()){
static::closeOutputBuffers();
}
}
}
$response->send();
}elseif(is_string($response)){
echo $response;
}elseif(is_array($response)){
if(isset($response['http_code'])){
http_response_code($response['http_code']);
unset($response['http_code']);
}
header('Content-Type: application/json');
echo json_encode($response,JSON_NUMERIC_CHECK);
}
}
if(!php_is_cli()){
static::closeOutputBuffers();
flush();
}
}
}
final class Str{
protected static $snakeCache=[];
public static function camel($value){
return lcfirst(static::studly($value));
}
public static function studly($value){
$value=ucwords(str_replace(['-','_'],' ',$value));
return str_replace(' ','',$value);
}
public static function singular($value){
return preg_replace('/s$/','',$value);
}
public static function startsWith($haystack,$needles){
foreach((array)$needles as $needle){
if($needle!=''&&strpos($haystack,$needle)===0){
return true;
}
}
return false;
}
public static function contains($haystack,$needles){
foreach((array)$needles as $needle){
if($needle!=''&&strpos($haystack,$needle)!==false){
return true;
}
}
return false;
}
public static function endsWith($haystack,$needle){
return $needle===substr($haystack,-strlen($needle));
}
public static function title($value){
return mb_convert_case($value,MB_CASE_TITLE,'UTF-8');
}
public static function capitalize($value){
if($value){
$first=mb_strtoupper(mb_substr($value,0,1,'UTF-8'),'UTF-8');
$last=mb_strtolower(mb_substr($value,1,null,'UTF-8'),'UTF-8');
$value=$first.$last;
}
return $value;
}
public static function lower($value){
return mb_strtolower($value,'UTF-8');
}
public static function upper($value){
return mb_strtoupper($value,'UTF-8');
}
public static function length($value){
return mb_strlen($value);
}
public static function limit($value,$limit=100,$end='...'){
if(mb_strlen($value)<=$limit){
return $value;
}
return rtrim(mb_substr($value,0,$limit,'UTF-8')).$end;
}
public static function snake($value,$delimiter='_'){
$key=$value.$delimiter;
if(isset(static::$snakeCache[$key])){
return static::$snakeCache[$key];
}
if(!ctype_lower($value)){
$value=preg_replace('/\s+/','',$value);
$value=strtolower(preg_replace('/(.)(?=[A-Z])/','$1'.$delimiter,$value));
}
return static::$snakeCache[$key]=$value;
}
public static function ascii($value){
foreach(static::charsArray()as $key=>$val){
$value=str_replace($val,$key,$value);
}
return preg_replace('/[^\x20-\x7E]/u','',$value);
}
protected static function charsArray(){
static $charsArray;
if(isset($charsArray)){
return $charsArray;
}
return $charsArray=['0'=>['°','₀','۰'],'1'=>['¹','₁','۱'],'2'=>['²','₂','۲'],'3'=>['³','₃','۳'],'4'=>['⁴','₄','۴','٤'],'5'=>['⁵','₅','۵','٥'],'6'=>['⁶','₆','۶','٦'],'7'=>['⁷','₇','۷'],'8'=>['⁸','₈','۸'],'9'=>['⁹','₉','۹'],'a'=>['à','á','ả','ã','ạ','ă','ắ','ằ','ẳ','ẵ','ặ','â','ấ','ầ','ẩ','ẫ','ậ','ā','ą','å','α','ά','ἀ','ἁ','ἂ','ἃ','ἄ','ἅ','ἆ','ἇ','ᾀ','ᾁ','ᾂ','ᾃ','ᾄ','ᾅ','ᾆ','ᾇ','ὰ','ά','ᾰ','ᾱ','ᾲ','ᾳ','ᾴ','ᾶ','ᾷ','а','أ','အ','ာ','ါ','ǻ','ǎ','ª','ა','अ','ا'],'b'=>['б','β','Ъ','Ь','ب','ဗ','ბ'],'c'=>['ç','ć','č','ĉ','ċ'],'d'=>['ď','ð','đ','ƌ','ȡ','ɖ','ɗ','ᵭ','ᶁ','ᶑ','д','δ','د','ض','ဍ','ဒ','დ'],'e'=>['é','è','ẻ','ẽ','ẹ','ê','ế','ề','ể','ễ','ệ','ë','ē','ę','ě','ĕ','ė','ε','έ','ἐ','ἑ','ἒ','ἓ','ἔ','ἕ','ὲ','έ','е','ё','э','є','ə','ဧ','ေ','ဲ','ე','ए','إ','ئ'],'f'=>['ф','φ','ف','ƒ','ფ'],'g'=>['ĝ','ğ','ġ','ģ','г','ґ','γ','ဂ','გ','گ'],'h'=>['ĥ','ħ','η','ή','ح','ه','ဟ','ှ','ჰ'],'i'=>['í','ì','ỉ','ĩ','ị','î','ï','ī','ĭ','į','ı','ι','ί','ϊ','ΐ','ἰ','ἱ','ἲ','ἳ','ἴ','ἵ','ἶ','ἷ','ὶ','ί','ῐ','ῑ','ῒ','ΐ','ῖ','ῗ','і','ї','и','ဣ','ိ','ီ','ည်','ǐ','ი','इ'],'j'=>['ĵ','ј','Ј','ჯ','ج'],'k'=>['ķ','ĸ','к','κ','Ķ','ق','ك','က','კ','ქ','ک'],'l'=>['ł','ľ','ĺ','ļ','ŀ','л','λ','ل','လ','ლ'],'m'=>['м','μ','م','မ','მ'],'n'=>['ñ','ń','ň','ņ','ŉ','ŋ','ν','н','ن','န','ნ'],'o'=>['ó','ò','ỏ','õ','ọ','ô','ố','ồ','ổ','ỗ','ộ','ơ','ớ','ờ','ở','ỡ','ợ','ø','ō','ő','ŏ','ο','ὀ','ὁ','ὂ','ὃ','ὄ','ὅ','ὸ','ό','о','و','θ','ို','ǒ','ǿ','º','ო','ओ'],'p'=>['п','π','ပ','პ','پ'],'q'=>['ყ'],'r'=>['ŕ','ř','ŗ','р','ρ','ر','რ'],'s'=>['ś','š','ş','с','σ','ș','ς','س','ص','စ','ſ','ს'],'t'=>['ť','ţ','т','τ','ț','ت','ط','ဋ','တ','ŧ','თ','ტ'],'u'=>['ú','ù','ủ','ũ','ụ','ư','ứ','ừ','ử','ữ','ự','û','ū','ů','ű','ŭ','ų','µ','у','ဉ','ု','ူ','ǔ','ǖ','ǘ','ǚ','ǜ','უ','उ'],'v'=>['в','ვ','ϐ'],'w'=>['ŵ','ω','ώ','ဝ','ွ'],'x'=>['χ','ξ'],'y'=>['ý','ỳ','ỷ','ỹ','ỵ','ÿ','ŷ','й','ы','υ','ϋ','ύ','ΰ','ي','ယ'],'z'=>['ź','ž','ż','з','ζ','ز','ဇ','ზ'],'aa'=>['ع','आ','آ'],'ae'=>['ä','æ','ǽ'],'ai'=>['ऐ'],'at'=>['@'],'ch'=>['ч','ჩ','ჭ','چ'],'dj'=>['ђ','đ'],'dz'=>['џ','ძ'],'ei'=>['ऍ'],'gh'=>['غ','ღ'],'ii'=>['ई'],'ij'=>['ĳ'],'kh'=>['х','خ','ხ'],'lj'=>['љ'],'nj'=>['њ'],'oe'=>['ö','œ','ؤ'],'oi'=>['ऑ'],'oii'=>['ऒ'],'ps'=>['ψ'],'sh'=>['ш','შ','ش'],'shch'=>['щ'],'ss'=>['ß'],'sx'=>['ŝ'],'th'=>['þ','ϑ','ث','ذ','ظ'],'ts'=>['ц','ც','წ'],'ue'=>['ü'],'uu'=>['ऊ'],'ya'=>['я'],'yu'=>['ю'],'zh'=>['ж','ჟ','ژ'],'(c)'=>['©'],'A'=>['Á','À','Ả','Ã','Ạ','Ă','Ắ','Ằ','Ẳ','Ẵ','Ặ','Â','Ấ','Ầ','Ẩ','Ẫ','Ậ','Å','Ā','Ą','Α','Ά','Ἀ','Ἁ','Ἂ','Ἃ','Ἄ','Ἅ','Ἆ','Ἇ','ᾈ','ᾉ','ᾊ','ᾋ','ᾌ','ᾍ','ᾎ','ᾏ','Ᾰ','Ᾱ','Ὰ','Ά','ᾼ','А','Ǻ','Ǎ'],'B'=>['Б','Β','ब'],'C'=>['Ç','Ć','Č','Ĉ','Ċ'],'D'=>['Ď','Ð','Đ','Ɖ','Ɗ','Ƌ','ᴅ','ᴆ','Д','Δ'],'E'=>['É','È','Ẻ','Ẽ','Ẹ','Ê','Ế','Ề','Ể','Ễ','Ệ','Ë','Ē','Ę','Ě','Ĕ','Ė','Ε','Έ','Ἐ','Ἑ','Ἒ','Ἓ','Ἔ','Ἕ','Έ','Ὲ','Е','Ё','Э','Є','Ə'],'F'=>['Ф','Φ'],'G'=>['Ğ','Ġ','Ģ','Г','Ґ','Γ'],'H'=>['Η','Ή','Ħ'],'I'=>['Í','Ì','Ỉ','Ĩ','Ị','Î','Ï','Ī','Ĭ','Į','İ','Ι','Ί','Ϊ','Ἰ','Ἱ','Ἳ','Ἴ','Ἵ','Ἶ','Ἷ','Ῐ','Ῑ','Ὶ','Ί','И','І','Ї','Ǐ','ϒ'],'K'=>['К','Κ'],'L'=>['Ĺ','Ł','Л','Λ','Ļ','Ľ','Ŀ','ल'],'M'=>['М','Μ'],'N'=>['Ń','Ñ','Ň','Ņ','Ŋ','Н','Ν'],'O'=>['Ó','Ò','Ỏ','Õ','Ọ','Ô','Ố','Ồ','Ổ','Ỗ','Ộ','Ơ','Ớ','Ờ','Ở','Ỡ','Ợ','Ø','Ō','Ő','Ŏ','Ο','Ό','Ὀ','Ὁ','Ὂ','Ὃ','Ὄ','Ὅ','Ὸ','Ό','О','Θ','Ө','Ǒ','Ǿ'],'P'=>['П','Π'],'R'=>['Ř','Ŕ','Р','Ρ','Ŗ'],'S'=>['Ş','Ŝ','Ș','Š','Ś','С','Σ'],'T'=>['Ť','Ţ','Ŧ','Ț','Т','Τ'],'U'=>['Ú','Ù','Ủ','Ũ','Ụ','Ư','Ứ','Ừ','Ử','Ữ','Ự','Û','Ū','Ů','Ű','Ŭ','Ų','У','Ǔ','Ǖ','Ǘ','Ǚ','Ǜ'],'V'=>['В'],'W'=>['Ω','Ώ','Ŵ'],'X'=>['Χ','Ξ'],'Y'=>['Ý','Ỳ','Ỷ','Ỹ','Ỵ','Ÿ','Ῠ','Ῡ','Ὺ','Ύ','Ы','Й','Υ','Ϋ','Ŷ'],'Z'=>['Ź','Ž','Ż','З','Ζ'],'AE'=>['Ä','Æ','Ǽ'],'CH'=>['Ч'],'DJ'=>['Ђ'],'DZ'=>['Џ'],'GX'=>['Ĝ'],'HX'=>['Ĥ'],'IJ'=>['Ĳ'],'JX'=>['Ĵ'],'KH'=>['Х'],'LJ'=>['Љ'],'NJ'=>['Њ'],'OE'=>['Ö','Œ'],'PS'=>['Ψ'],'SH'=>['Ш'],'SHCH'=>['Щ'],'SS'=>['ẞ'],'TH'=>['Þ'],'TS'=>['Ц'],'UE'=>['Ü'],'YA'=>['Я'],'YU'=>['Ю'],'ZH'=>['Ж'],' '=>["\xC2\xA0","\xE2\x80\x80","\xE2\x80\x81","\xE2\x80\x82","\xE2\x80\x83","\xE2\x80\x84","\xE2\x80\x85","\xE2\x80\x86","\xE2\x80\x87","\xE2\x80\x88","\xE2\x80\x89","\xE2\x80\x8A","\xE2\x80\xAF","\xE2\x81\x9F","\xE3\x80\x80"],];
}
}
class URL{
public static function route($name,$secure=null){
$path=App::path($name);
return $secure?self::to($path,$secure):$path;
}
public static function to($path,$secure=null){
$host=Request::host();
$secure=($secure||($secure===null&&Request::secure()))&&strpos(PHP_SAPI,'apache')!==false&&strpos($host,'myabakus.org')===false;
return 'http'.($secure?'s':'').'://'.$host.$path;
}
public static function current(){
$path=Request::get('uri');
if(false!==($pos=strpos($path,'?'))){
$path=substr($path,0,$pos);
}
return $path;
}
public static function previous(){
return Request::header('referer');
}
public static function currentRoot($path=null){
return dirname(self::current()).$path;
}
public static function previousRoot($path=null){
return dirname(static::currentRoot($path));
}
}
class Input{
private static $data=[];
public static function all(){
return static::$data;
}
public static function get($field,$default=null){
if(strpos($field,'.')!==false){
return array_get(static::$data,$field,$default);
}
return isset(static::$data[$field])?static::$data[$field]:$default;
}
public static function set($field,$value=null){
if(func_num_args()===1){
static::$data=$field;
}else{
static::$data[$field]=$value;
}
return static::$data;
}
public static function has($field){
return isset(static::$data[$field]);
}
public static function only($keys){
$keys=is_array($keys)?$keys:func_get_args();
$values=[];
foreach($keys as $key){
$values[$key]=static::get($key);
}
return $values;
}
public static function pluck($field){
$value=static::get($field);
static::remove($field);
return $value;
}
public static function remove($field){
unset(static::$data[$field]);
}
public static function fromJson(){
return $_POST=static::set(Request::json());
}
public static function fromGlobal(){
if(Request::isMethod('get')){
$input=$_GET;
}else{
$input=$_POST+$_FILES;
unset($input['_method'],$input['_']);
}
return static::set($input);
}
}
class FileNotFoundException extends \Exception{
}
class File{
public static function exists($path){
return file_exists($path);
}
public static function get($path){
if(self::isFile($path)){
return file_get_contents($path);
}
throw new FileNotFoundException("File does not exist at path {$path}");
}
public static function put($path,$contents){
return file_put_contents($path,$contents);
}
public static function isFile($file){
return is_file($file);
}
public static function isDirectory($directory){
return is_dir($directory);
}
public static function makeDirectory($path,$mode=0755,$recursive=false){
return self::isDirectory($path)?:mkdir($path,$mode,$recursive);
}
public static function delete($paths){
$paths=is_array($paths)?$paths:func_get_args();
$success=true;
foreach($paths as $path){
if(!@unlink($path)){
$success=false;
}
}
return $success;
}
public static function deleteDirectory($directory,$preserve=false){
if(!self::isDirectory($directory)){
return false;
}
$items=new FilesystemIterator($directory);
foreach($items as $item){
if($item->isDir()){
self::deleteDirectory($item->getPathname());
}else{
self::delete($item->getPathname());
}
}
if(!$preserve&&static::isDirectory($directory)){
rmdir($directory);
}
return true;
}
public static function cleanDirectory($directory){
return static::deleteDirectory($directory,true);
}
public static function toArray($path){
$content=static::get($path);
return json_decode($content,true);
}
public static function json($path,$data){
return static::put($path,json_encode($data,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
}
}
class Server{
private static $data=[];
public static function isEmpty(){
return empty(static::$data);
}
public static function set(array $data){
$headers=[];
$contentHeaders=['CONTENT_LENGTH'=>true,'CONTENT_MD5'=>true,'CONTENT_TYPE'=>true];
$server=[];
$request=[];
foreach($data as $key=>$value){
if(0===strpos($key,'HTTP_')){
$headers[substr($key,5)]=$value;
}elseif(isset($contentHeaders[$key])){
$headers[$key]=$value;
}elseif(0===strpos($key,'REQUEST_')){
$request[substr($key,8)]=$value;
}elseif($key=='QUERY_STRING'){
$request[$key]=$value;
}elseif(0!==strpos($key,'REDIRECT_')){
if(0===strpos($key,'SERVER_')){
$key=substr($key,7);
}
$server[$key]=$value;
}
}
self::$data=$server;
Request::set($request,$headers);
}
public static function get($name,$default=null){
$name=strtoupper($name);
return isset(self::$data[$name])?self::$data[$name]:$default;
}
public static function isLocal(){
return self::get('addr')=='127.0.0.1';
}
public static function fromGlobal(){
static::set($_SERVER);
}
}
class Request{
private static $data=[];
private static $headers=[];
public static function isMethod($method){
return static::method()==strtoupper($method);
}
public static function method(){
$method=static::get('method','GET');
if($method=='POST'){
$_method=empty($_POST['_method'])?static::header('x_http_method_override'):$_POST['_method'];
$_method=strtoupper($_method);
if(in_array($_method,['PUT','PATCH','DELETE'])){
$method=$_method;
}
}
return $method;
}
public static function host(){
return static::header('host');
}
public static function query(){
return static::get('query_string');
}
public static function ajax(){
static $ajax=null;
if($ajax===null){
$ajax=static::header('x_requested_with')=='XMLHttpRequest';
}
return $ajax;
}
public static function isJson(){
return Str::contains(static::header('content_type'),['/json','+json']);
}
public static function wantsJson(){
static $wantsJson=null;
if($wantsJson===null){
$wantsJson=Str::contains(static::header('accept'),'application/json');
}
return $wantsJson;
}
public static function secure(){
$https=Server::get('https');
return $https===1||strtolower($https)==='on';
}
public static function header($name,$default=null){
$name=strtoupper($name);
return isset(static::$headers[$name])?static::$headers[$name]:$default;
}
public static function set(array $data,array $headers){
static::$data=$data;
static::$headers=$headers;
}
public static function get($name,$default=null){
$name=strtoupper($name);
return isset(static::$data[$name])?static::$data[$name]:$default;
}
public static function ip(){
return static::header('client_ip')?:(static::header('x_forwarded_for')?:Server::get('remote_addr'));
}
public static function rawPost(){
return file_get_contents("php://input");
}
public static function json($key=null){
static $data;
if($data===null){
$data=json_decode(static::rawPost(),true);
}
return isset($data[$key])?$data[$key]:$data;
}
public static function authorization($type){
$header=static::header('authorization');
$parts=explode(' ',$header,2);
if(count($parts)!=2){
return null;
}
list($method,$value)=$parts;
if(strcasecmp($type,$method)!==0){
return null;
}
$method=ucfirst(strtolower($method));
if($method==='Basic'){
$value=base64_decode($value);
$value=explode(':',$value,2);
if(count($value)!=2){
return null;
}
}
return $value;
}
}
($video=(new class extends ArrayObject{
const LANGS=['es','en'];
const HOST_URL=['y'=>'https://www.youtube.com/embed/ID?autoplay=1&rel=0','s'=>'https://screencast-o-matic.com/embed?sc=ID&v=5&title=0&ff=1&a=1'];
protected $routes=['slug'=>[],'id'=>[]];
protected $originalRoutes=[];
protected $publish=false;
public function __construct(){
Server::fromGlobal();
Input::fromGlobal();
$this->loadRoutes();
parent::__construct($this->findVideo(),static::STD_PROP_LIST|static::ARRAY_AS_PROPS);
}
public function dispatch(){
if($this->publish){
die('El router sea regenerado...');
}
if(!($this['id']?? false)){
http_response_code(404);
readfile(__DIR__.'/../notfound.html');
exit;
}
$this->findNextVideo();
}
public function nextSlug(){
return $this->rootUrl().$this['next']['slug'];
}
public function rootUrl(){
return '/videos/';
}
public function next(){
return $this['next']?? null;
}
protected function findVideo(){
$slug=$this->getSlug();
if($slug=='publish'){
$this->publish=true;
$this->regenerate();
return [];
}
if(($id=$this->getId())&&($video=$this->findById($id))){
return $video;
}
return $this->findBySlug($slug);
}
protected function findNextVideo(){
if($this['next']?? null){
$video=$this->findById($this['next']);
$video['slug']=$this->rootUrl().$video['slug'];
$this['next']=new class($video,static::STD_PROP_LIST|static::ARRAY_AS_PROPS)extends ArrayObject{
const TRANSLATE=['es'=>'Siguiente video','en'=>'Next video'];
public function translate(){
return static::TRANSLATE[$this['lang']];
}
}
;
}
}
protected function findById($id){
$route=array_get($this->routes['id'],$id);
return $this->resolve($route);
}
protected function findBySlug($slug){
if(!($route=array_get($this->routes['slug'],$slug,[]))){
if(!($route=$this->findInTutorials($slug))){
$route=$this->findInCourses($slug);
}
}
return $this->resolve($route);
}
protected function getSlug(){
$path=URL::current();
$slug=str_replace($this->rootUrl(),'',$path);
return strtolower($slug);
}
protected function getId(){
return Input::get('id');
}
protected function loadRoutes(){
$this->originalRoutes=File::toArray($this->getRouter());
foreach($this->originalRoutes as $video){
$id=array_get($video,'id');
$slug=array_get($video,'slug');
$this->routes['id'][$id]=$video;
$this->routes['slug'][$slug]=$video;
}
}
protected function findInTutorials($slug){
$route=[];
foreach(static::LANGS as $lang){
$tutorials=$this->filteToArray($lang,'videos');
if($route=$this->findInData($slug,$tutorials)){
return $route;
}
}
return $route;
}
protected function findInCourses($slug){
$route=[];
foreach(static::LANGS as $lang){
$courses=$this->filteToArray($lang,'course');
foreach($courses['lessons']as $lesson){
if($route=$this->findInData($slug,$lesson)){
return $route;
}
}
}
return $route;
}
protected function findInData($slug,$data){
foreach($data['videos']as $item){
$curSlug=str_slug($item['title']);
if($curSlug==$slug){
$route=$this->getRoute($slug,$item);
$id=$route['id'];
$routes=$this->routes['id'][$id]?? false?$this->removeRoute($route['id']):$this->originalRoutes;
$routes[]=$route;
File::json($this->getRouter(),$routes);
return $route;
}
}
return [];
}
protected function resolveFilename($lang,$path){
return __DIR__.'/../js/'.$path.'-'.$lang.'.js';
}
protected function getRouter(){
return __DIR__.'/routes.json';
}
protected function filteToArray($lang,$path){
$content=File::get($this->resolveFilename($lang,$path));
$content=str_replace(['var data = ',';'],'',$content);
$content=trim($content);
return json_decode($content,true);
}
protected function getRoute($slug,$item){
$route=['slug'=>$slug,'title'=>$item['title'],'desc'=>$item['desc'],'lang'=>$item['lang'],'id'=>$item['id'],];
if($item['next']?? false){
$route['next']=$item['next'];
}
return $route;
}
protected function removeRoute($id){
foreach($this->originalRoutes as $index=>$route){
if($id==$route['id']){
unset($this->originalRoutes[$index]);
}
}
return array_values($this->originalRoutes);
}
protected function regenerate(){
$routes=[];
foreach(static::LANGS as $lang){
$tutorials=$this->filteToArray($lang,'videos');
$gs=$this->filteToArray($lang,'gs');
$routes=array_merge($routes,$this->getRoutes($tutorials['videos']));
$routes=array_merge($routes,$this->getRoutes($gs['videos']));
$courses=$this->filteToArray($lang,'course');
foreach($courses['lessons']as $lesson){
$routes=array_merge($routes,$this->getRoutes($lesson['videos']));
}
}
File::json($this->getRouter(),$routes);
}
protected function getRoutes($videos,$host='y'){
$routes=[];
foreach($videos as $video){
$slug=str_slug($video['title']);
$video=$this->getRoute($slug,$video);
$video['host']=$host;
$routes[]=$video;
}
return $routes;
}
protected function resolve($route){
$path=static::HOST_URL[$route['host']];
$route['url']=str_replace('ID',$route['id'],$path);
return $route;
}
}))->dispatch();
}
