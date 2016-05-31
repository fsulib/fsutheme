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
        heightStyle: "fill"
      });
    }   
  };
})(jQuery);

/* Article Search Function */
function articleSearch(search_form) {

  /* Get Filters set by user */
  var peer_review_filter = document.getElementById("filter_peer_reviewed").checked;
  var newspaper_filter = document.getElementById("filter_include_newspapers").checked;
  var date_range_filter = document.getElementById("filter_date_published").checked;
  var full_text_filter = document.getElementById("filter_article_full_text").checked;

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;

  if (date_range_filter) {
    query += "s.rf=PublicationDate%2C2005%3A*&amp;";
  }

  if (peer_review_filter) {
    query += "s.fvf%5B%5D=IsPeerReviewed%2Ctrue%2Cf&amp;";
  }

  if (full_text_filter) {
    query += "s.fvf%5B%5D=IsFullText%2Ctrue%2Cf&amp;";
  }

  if (!newspaper_filter) {
    query += "s.fvf%5B%5D=ContentType%2CNewspaper+Article%2Ct&amp;";
  }

  query += "s.q=" + document.forms[search_form]["article_search_input"].value;

  if (date_range_filter) {
    query += "&amp;s.cmd=setRangeFilter(PublicationDate," + 
      document.forms[search_form]["date_range"].value + ":*)";
  }  

  window.location = query;  
  return false;
}

/* Book Search Function */
function bookSearch(search_form) {

  /* Get Filters set by user */
  var full_text_filter = document.getElementById("filter_book_full_text").checked;
  var book_review_filter = document.getElementById("filter_include_book_reviews").checked;

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;
  
  if (full_text_filter) {
    query += "s.fvf%5B%5D=IsFullText%2Ctrue%2Cf&amp;";
  }
  
  if (!book_review_filter) {
    query += "s.fvf%5B%5D=ContentType%2CBook+Review%2Ct&amp;";
  }
  
  query += "s.q=" + document.forms[search_form]["book_search_input"].value;
  
  window.location = query;  
  return false;
}