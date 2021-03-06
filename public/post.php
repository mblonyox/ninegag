<?php

$html = file_get_contents('index.html');
$head = '</head>';
$meta = '';

$http_host = $_SERVER['HTTP_HOST'];
$protocol= isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) ? 'https' : 'http';

$host = 'https://9gag.com';
$post_id = $_GET['id'];

try {
  $response = file_get_contents($host.'/v1/post?id='.$post_id);
  $json = json_decode($response, true);
  $post = $json['data']['post'];

  $title = html_entity_decode($post['title']);
  $description = 'Ninegag via Mblonyox';
  $url = "{$protocol}://{$http_host}/post/{$post_id}";
  $image = $post['images']['image460']['url'];

  $meta .= "<meta property=\"og:type\" content=\"website\" />";
  $meta .= "<meta property=\"og:title\" content=\"{$title}\" />";
  $meta .= "<meta property=\"og:description\" content=\"{$description}\" />";
  $meta .= "<meta property=\"og:url\" content=\"{$url}\" />";
  $meta .= "<meta property=\"og:image\" content=\"{$image}\" />";
  $meta .= "<meta name=\"twitter:card\" content=\"summary_large_image\" />";
  $meta .= "<meta name=\"twitter:site\" content=\"@mblonyox\" />";
  $meta .= "<meta itemprop=\"name\" content=\"{$title}\" />";
  $meta .= "<meta itemprop=\"image\" content=\"{$image}\" />";
  $meta .= "<meta itemprop=\"description\" content=\"{$description}\" />";
} catch (\Exception $e) {
} finally {
  echo str_replace($head, $meta.$head ,$html);
}
