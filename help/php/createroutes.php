<?php
//función para obtener la data de videos
function get_foreach_videos($data) {
  foreach($data['videos'] as $video) {
    unset($video['icon']);
    unset($video['tags']);
    $videoData[] = $video;
  }
  return $videoData;
}

//función para obtener la data de los archivos
function get_videos($filename) {
  $data = file_get_contents($filename);
  $search = array("var data = ", ";");
  $replace = array("");
  $data = str_replace($search, $replace, $data);
  //convierto la data en array
  $data = json_decode($data, true);

  if($filename == "../js/videos-en.js" || $filename == "../js/videos-es.js"){
    $videoData = array();
    $videoData = get_foreach_videos($data);
  }
  else {
    $lessons = $data['lessons'];
    $videoData = array();
    foreach($lessons as $videos){
      $videoData[] = get_foreach_videos($videos);
    }
  }
    print_r($videoData);
  return $videoData;
}
//función para crear el archivo routes.json
function set_array_json($array) {
  $file = 'routes.json';
  $setFile = file_put_contents($file, json_encode($array));
}

$videos1 = array();
$videos2 = array();
$videos3 = array();
$videos4 = array();
//$videos1 = get_videos("../js/videos-en.js");
//$videos2 = get_videos("../js/videos-es.js");
$videos3 = get_videos("../js/course-en.js");
//$videos4 = get_videos("../js/course-es.js");
$videos = array_merge($videos1, $videos2, $videos3, $videos4);

set_array_json($videos);

?>