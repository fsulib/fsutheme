/**
 * @file
 * A JavaScript file for the theme.
 */
 
(function ($) {
  Drupal.behaviors.fsutheme = {
    attach: function(context, settings) {           
      
      //Add accordion functionality
      $("#accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
      });
      
      //Add tabs functionality
      $("#tabs").tabs({
        heightStyle: "fill"
      });
      
      //Add three row carousel functionality
      $(".carousel-three-items").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button class="slick-prev"><</button>',
        nextArrow: '<button class="slick-next">></button>',
        responsive: [
          {
            breakpoint: 980,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 740,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
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

/* Summon Book Search Function */
function summonBookSearch(search_form) {

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

/* Catalog Book Search Function */
function catalogBookSearch(search_form) {
 
  /* Get Filters set by user */
  var full_text_filter = document.getElementById("filter_book_full_text").checked;

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;
  query += document.forms[search_form]["book_search_input"].value;
  query += "&ix=kw&fl=bo";
  
  if (full_text_filter) {
    query += "&fa=materialtypes_facet%3AOnline%5C+Resource%5C%5BFS%5C%5D";
  }
  
  window.location = query;
  return false;
}

/* OneSearch Functions */
function onesearchController(search_form) {
  var base_url = "https://login.proxy.lib.fsu.edu/login?url=http://fsu.summon.serialssolutions.com/search?s.fvf%5B%5D=ContentType%2CBook+Review%2Ct&s.q=";
  var path = base_url + document.forms[search_form]["search"].value; 
  window.location = path;
  return false;
}