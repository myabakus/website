<?php
namespace{
use App\Exception as AppException;
function cache_get($id){
$filename=APP_CACHE.$id.'.sz';
if(file_exists($filename)&&false!==($data=file_get_contents($filename))){
if(false===($data=unserialize($data))){
$data=[];
}
}else{
$data=[];
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
return strtolower(str_replace(['{','}'],'',com_create_guid()));
}else{
mt_srand((double)microtime()*10000);
$charid=md5(uniqid(rand(),true));
$hyphen=chr(45);
$uuid=substr($charid,0,8) .$hyphen.substr($charid,8,4) .$hyphen.substr($charid,12,4) .$hyphen.substr($charid,16,4) .$hyphen.substr($charid,20,12);
return strtolower($uuid);
}
}
function uuid_encode($id){
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
static $prefix=[Constant::TRANSACTION_INCOME=>'I-',Constant::TRANSACTION_INCOME_CREDITS=>'NC-',Constant::TRANSACTION_EXPENSE=>'E-',Constant::TRANSACTION_EXPENSE_CREDITS=>'NC-',];
if(is_numeric($number)){
return $prefix[$type].$number;
}
return $number;
}
if(!function_exists('str_random')){
function str_random($length){
$bytes=openssl_random_pseudo_bytes(2*$length);
if($bytes!==false){
$random=substr(str_replace(['/','+','='],'',base64_encode($bytes)),0,$length);
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
$return=[];
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
function view($name){
return View::make($name,false);
}
}
if(!function_exists('layout')){
function layout($name='default',Closure $callback=null){
return Layout::make($name,$callback);
}
}
if(!function_exists('array_only')){
function array_only($array,$keys){
return array_intersect_key($array,array_flip((array)$keys));
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
(new Dotenv\Dotenv($path))->load();
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
function array_sort_by(array&$data,$columnName){
usort($data,function($a,$b)use($columnName){
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
final class App{
private static $name='app';
private static $locale='en';
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
self::$name=$name;
dotenv(LIB_PATH);
Server::fromGlobal();
Input::fromGlobal();
Cookie::fromGlobal();
$route=Router::match(URL::current());
self::$module=$route['module'];
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
}elseif($name==='id'){
$params[$name]=uuid_decode($params[$name]);
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
return Json::error(['down'=>true,'info'=>__('app_down')]);
}
throw new AppException\MaintenanceException;
}
}
}
private static function send($controller,$response){
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
echo json_encode($response);
}
}
if(!php_is_cli()){
static::closeOutputBuffers();
flush();
}
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
return self::$data;
}
public static function get($field,$default=null){
if(strpos($field,'.')!==false){
return array_get(static::$data,$field,$default);
}
return isset(self::$data[$field])?self::$data[$field]:$default;
}
public static function set($field,$value=null){
if(func_num_args()===1){
self::$data=$field;
}else{
self::$data[$field]=$value;
}
return static::$data;
}
public static function has($field){
return isset(self::$data[$field]);
}
public static function only($keys){
$keys=is_array($keys)?$keys:func_get_args();
$values=[];
foreach($keys as $key){
$values[$key]=self::get($key);
}
return $values;
}
public static function remove($field){
unset(self::$data[$field]);
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
return self::method()==strtoupper($method);
}
public static function method(){
$method=self::get('method','GET');
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
return self::header('host');
}
public static function query(){
return self::get('query_string');
}
public static function ajax(){
static $ajax=null;
if($ajax===null){
$ajax=self::header('x_requested_with')=='XMLHttpRequest';
}
return $ajax;
}
public static function isJson(){
return Str::contains(static::header('content_type'),['/json','+json']);
}
public static function wantsJson(){
static $wantsJson=null;
if($wantsJson===null){
$wantsJson=self::header('accept')=='application/json';
}
return $wantsJson;
}
public static function secure(){
$https=Server::get('https');
return $https===1||strtolower($https)==='on';
}
public static function header($name,$default=null){
$name=strtoupper($name);
return isset(self::$headers[$name])?self::$headers[$name]:$default;
}
public static function set(array $data,array $headers){
self::$data=$data;
self::$headers=$headers;
}
public static function get($name,$default=null){
$name=strtoupper($name);
return isset(self::$data[$name])?self::$data[$name]:$default;
}
public static function ip(){
return self::header('client_ip')?:(self::header('x_forwarded_for')?:Server::get('remote_addr'));
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
}
($video=(new class extends ArrayObject{
protected $routes=['slug'=>[],'id'=>[]];
public function __construct(){
Server::fromGlobal();
Input::fromGlobal();
$this->loadRoutes();
parent::__construct($this->findVideo(),static::STD_PROP_LIST|static::ARRAY_AS_PROPS);
}
public function dispatch(){
if(!$this['id']){
http_response_code(404);
die('Not found...');
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
if(($id=$this->getId())&&($video=$this->findById($id))){
return $video;
}
$slug=$this->getSlug();
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
return array_get($this->routes['id'],$id);
}
protected function findBySlug($slug){
return array_get($this->routes['slug'],$slug,[]);
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
$content=File::get(__DIR__.'/routes.json');
$routes=json_decode($content,true);
foreach($routes as $video){
$id=array_get($video,'id');
$slug=array_get($video,'slug');
$this->routes['id'][$id]=$video;
$this->routes['slug'][$slug]=$video;
}
}
}))->dispatch();
}