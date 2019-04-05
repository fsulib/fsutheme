/**
 * @file
 * A JavaScript file for the theme.
 */

(function ($) {
  Drupal.behaviors.fsutheme = {
    attach: function(context, settings) {

      //Add readmore functionality
      $(".read-more-content").readmore({
        collapsedHeight: 0
      });

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
  var sanitized_input = encodeURIComponent(document.forms[search_form]["all-search-input"].value);
  var query = document.forms[search_form]["base_query"].value;
  query += "&bQuery=" + sanitized_input + "&cli0=FT&clv0=Y&cli1=FT1&clv1=Y&type=1";
  window.location = query;
  return false;
}

/* Article Search Function */
function articleSearch(search_form) {

  var count = 1;

  /* Get Filters set by user */
  var peer_review_filter = document.getElementById("filter_peer_reviewed").checked;
  var date_range_filter = document.getElementById("filter_date_published").checked;
  var full_text_filter = document.getElementById("filter_article_full_text").checked;

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;
  query += "&bQuery=" + encodeURIComponent(document.forms[search_form]["article_search_input"].value);
  query += "&cli0=FT1&clv0=Y&type=1";

  if (full_text_filter) {
    query += "&cli" + count + "=FT&clv" + count + "=Y";
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
  var ebook_filter = document.getElementById("filter_book_full_text").checked;
  var all_books_filter = document.getElementById("books_and_ebooks").checked;

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;
  query += "&bQuery=" + encodeURIComponent(document.forms[search_form]["book_search_input"].value) + "&cli0=FC&clv0=Y";

  if (ebook_filter) {
    query = "https://login.proxy.lib.fsu.edu/login?url=" +
            "http://widgets.ebscohost.com/prod/search/index.php?direct=true" +
            "&scope=site&site=eds-live&authtype=ip,guest&custid=s5308004&groupid=main&profile=eds" +
            "&ailc=y&facet=eBooks&bquery=" + encodeURIComponent(document.forms[search_form]["book_search_input"].value);
  }

  if (all_books_filter) {
    query = "https://login.proxy.lib.fsu.edu/login?url=" +
            "http://widgets.ebscohost.com/prod/search/index.php?direct=true" +
            "&scope=site&site=eds-live&authtype=ip,guest&custid=s5308004&groupid=main&profile=eds" +
            "&ailc=y&facet=eBooks,Books&bquery=" + encodeURIComponent(document.forms[search_form]["book_search_input"].value);
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
  var proxy = "https://login.proxy.lib.fsu.edu/login?url=";
  var base_url = proxy + "http://search.ebscohost.com/login.aspx?direct=true&authtype=ip,guest&custid=s5308004&profile=eds&groupID=main";
  var path = base_url + "&bQuery=" + document.forms[search_form]["search"].value; 
  path += "&cli0=FT&clv0=Y&cli1=FT1&clv1=Y&type=1";
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
  var current_year = new Date().getFullYear();
  date_parameter = "&cli2=DT1&clv2=" + document.forms[the_form]["date_range"].value + "01-" + current_year + "12";
  var query = document.forms[the_form]["base_url"].value + document.forms[the_form]["article_search_query"].value + document.forms[the_form]["end_url"].value + date_parameter;
  window.location = query;
  return false;
}

/* Special Search functions */
function limittonapoleon(myForm) {
  myForm.bquery.value = myForm.uquery.value + ' AND (LB "Special Collections, Napoleon Collection")';
}

function limittoshaw(myForm) {
  myForm.bquery.value = myForm.uquery.value + ' AND (LB "Special Collections, Shaw Childhood in Poetry Collection")';
}

function limittomarsha(myForm) {
  myForm.bquery.value = myForm.uquery.value + ' AND (LB "Special Collections, Marsha Gontarski Children&#39;s Literature Collection")';
}
