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
  drupal_add_js(libraries_get_path('slick') . '/slick/slick.js');
  drupal_add_css(libraries_get_path('slick') . '/slick/slick.css');
}
