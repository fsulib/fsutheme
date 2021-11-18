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

      $(window).load(function() {
        $('img').each(function() {
          if ( !this.complete
          ||   typeof this.naturalWidth == "undefined"
          ||   this.naturalWidth == 0                  ) {
            // image was broken, replace with your new image
            this.src = '/sites/default/files/base/ebook-no-image.png';
          }
        });
      });

    }
  };
})(jQuery);

/* Limit By Location Function */
function limitByLocation(search_form) {
  var sanitized_input = encodeURIComponent(document.forms[search_form]["uquery"].value);
  var query = "https://fsu-flvc.primo.exlibrisgroup.com/discovery/search?query=any,contains,";
  query += sanitized_input + "&tab=Everything&search_scope=MyInst_and_CI&vid=01FALSC_FSU:Home&offset=0&mfacet=library,include,6576%E2%80%93112132360006576,1";
  window.location = query;
  return false;
}
					 
/* All Search Function */
function allSearch(search_form) {
  var sanitized_input = encodeURIComponent(document.forms[search_form]["all-search-input"].value);
  var query = document.forms[search_form]["base_query"].value;
  query += sanitized_input + "&tab=Everything&search_scope=MyInst_and_CI&vid=01FALSC_FSU:Home&offset=0";
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
  var open_access_filter = document.getElementById("filter_open_access").checked;

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;
  query += encodeURIComponent(document.forms[search_form]["article_search_input"].value);
  query += "&tab=Everything&search_scope=MyInst_and_CI&vid=01FALSC_FSU:Home&facet=rtype,include,articles";

  if (full_text_filter) {
    query += "&mfacet=tlevel,include,online_resources,2";
  }

  if (peer_review_filter) {
    query += "&mfacet=tlevel,include,peer_reviewed,1";
  }

  if (open_access_filter) {
    query += "&mfacet=tlevel,include,open_access,1";
  }

  if (date_range_filter) {
    var current_year = new Date().getFullYear();
    query += "&facet=searchcreationdate,include," + document.forms[search_form]["date_range"].value + "%7C,%7C" + current_year;
  }

  query += "&offset=0";

  window.location = query;
  return false;
}

/* EDS Book Search Function */
function edsBookSearch(search_form) {

  /* Get Filters set by user */
  var book_filter_element = document.getElementsByName("book_filter");
  var book_filter = "all";

  for(i = 0; i < book_filter_element.length; i++) {
    if(book_filter_element[i].checked) {
      book_filter = book_filter_element[i].value;
    }
  }

  /* Create the query */
  var query = document.forms[search_form]["base_query"].value;
  query += encodeURIComponent(document.forms[search_form]["book_search_input"].value) +
    "&tab=Everything&search_scope=MyInst_and_CI&vid=01FALSC_FSU:Home&mfacet=rtype,include,books,1";

  if (book_filter == "online") {
    query += "&mfacet=tlevel,include,online_resources,2";
  }
  else if (book_filter == "library") {
    query += "&mfacet=tlevel,include,available_on_shelf,1";
  }

  query += "&lang=en&offset=0";

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
