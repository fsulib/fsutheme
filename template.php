<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 *
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

function fsutheme_preprocess(&$variables, $hook) {
  drupal_add_css('https://cloud.webtype.com/css/83d58b53-6c1e-4957-b3f5-ca921f831767.css',
    array('type' => 'external'));
  drupal_add_library('system', 'ui.accordion');
  drupal_add_library('system', 'ui.tabs');
  drupal_add_library('system', 'ui.dialog');
  drupal_add_js(libraries_get_path('slick') . '/slick/slick.js');
  drupal_add_css(libraries_get_path('slick') . '/slick/slick.css');
  drupal_add_js(libraries_get_path('readmorejs') .'/readmore.js');

  //Prevent snippets from Google
  $googlebot_nosnippet_tag = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'googlebot',
      'content' => 'nosnippet',
    )
  );

  drupal_add_html_head($googlebot_nosnippet_tag, 'googlebot_nosnippet');
}

function fsutheme_breadcrumb(&$variables) {
  $breadcrumb = $variables['breadcrumb'];
  $breadcrumb[] = drupal_get_title();
  $output = '<div class="breadcrumb">' . implode('&nbsp;  >>  &nbsp;', $breadcrumb) . '</div>';
  return $output;
}
