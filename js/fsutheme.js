/**
 * @file
 * A JavaScript file for the theme.
 */
 
(function ($) {
  Drupal.behaviors.fsutheme = {
    attach: function(context, settings) {           
      
      //Add accordion functionality
      $("#accordion").accordion({
        heightStyle: "content"
      });
      
      //Add tabs functionality
      $("#tabs").tabs({
        heightStyle: "auto"
      });
    }   
  };
})(jQuery);
