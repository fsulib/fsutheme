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

      $(".accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
      });

      //Add tabs functionality
      $("#tabs").tabs({
        heightStyle: "fill"
      });

      $(".jq-tabs").tabs({
        heightStyle: "content"
      });

      //Code to open accordion to specific tab
      if(window.location.hash) {
        var hash = window.location.hash.substring(1); //Puts hash in variable
        var id_index_array = hash.split("_");
        $("#" + id_index_array[0]).accordion({
         active: Number(id_index_array[1]) - 1
        });
	location.href = "#";
        location.href = "#" + id_index_array[0];
      }

      //Add popup functionality
      var opt = { modal: true };
      $(".jq-dialog-link").click(function () {
        $(".jq-dialog").dialog( opt ).dialog('open');
        return false;
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

/* All Search Function */
function allSearch(search_form) {
  var query = document.forms[search_form]["base_query"].value;
  query += "&bQuery=" + document.forms[search_form]["all-search-input"].value;
  window.location = query;
  return false;
}

/* Article Search Function */
function articleSearch(search_form) {

  var count = 0;

  /* Get Filters set by user */
  var peer_review_filter = document.getElementById("filter_peer_reviewed").checked;
  var date_range_filter = document.getElementById("filter_date_published").checked;
  var full_text_filter = document.getElementById("filter_article_full_text").checked;

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;
  query += "&bQuery=" + document.forms[search_form]["article_search_input"].value;

  if (full_text_filter) {
    query += "&cli" + count + "=FT1&clv" + count + "=Y";
    count++;
  }

  if (peer_review_filter) {
    query += "&cli" + count + "=RV&clv" + count + "=Y";
    count++;
  }

  if (date_range_filter) {
    var current_year = new Date().getFullYear();
    query += "&cli" + count + "=DT1&clv" + count + "=" + document.forms[search_form]["date_range"].value + "01-" + current_year + "12"; 
  }

  window.location = query;
  return false;
}

/* EDS Book Search Function */
function edsBookSearch(search_form) {

  /* Get Filters set by user */
  var full_text_filter = document.getElementById("filter_book_full_text").checked;

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;
  query += "&bQuery=" + document.forms[search_form]["book_search_input"].value + "&cli0=FC&clv0=Y";

  if (full_text_filter) {

  }

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

/* Tooltip function */

function fsuthemeTooltip($) {
  var tooltipLinkElement = $('.tooltip-link');

  tooltipLinkElement.each(function() {
    var self = $(this),
        selfTooltipText = self.data('tooltip-text');
    if  ( selfTooltipText ) $('<span/>', {class: 'tooltip', text: selfTooltipText}).appendTo(self);
  });
}

/* Find an Article Page Functions */
function makeURL(the_form) {
var query = document.forms[the_form]["base_url"].value + document.forms[the_form]["article_search_query"].value + document.forms[the_form]["middle_url"].value + document.forms[the_form]["end_url"].value;
window.location = query;
return false;
}
