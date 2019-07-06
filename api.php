<?php
// $url = 'https://9gag.com/v1/group-posts/group/default/type/hot';

$host = 'https://9gag.com';
$path = $_SERVER['PATH_INFO'];
$query = http_build_query($_GET);

// Get content
$result = file_get_contents($host.$path.'?'.$query);

// Output to client
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo $result;
