var $db = new Lawnchair({table:"appdata", adaptor:"webkit"});

var jQT = new $.jQTouch({
  startupScreen:"/iphone/images/splash.png",
  statusBar:'default',
  icon:'/iphone/images/icon.png',
  preloadImages:[
  ],
  fullScreenClass: "fullscreen",
  onAjaxPageLoaded: function(element){
    // for article
    jQT.init_iScroll();

    // for gallery
    if(element.match(/gallery[0-9]+/)){
      var gallery_id = element.replace("gallery","");
      var gallery_element_id = "photos" + gallery_id
      
      
      load_gallery(gallery_id);
      $("#" + element + " .photo_gallery a").each(function(){
        $(this).click(function(){
          // GO TO PICTURE
          jQT.goToSlide("#" + gallery_element_id + "", 1);
          return false;
        })
      })
    }
    // for all
    var current_page = {key:element, uri:$("#" + element).attr("unique_uri"), uri_html:$("a[href=#" + element + "]").html()}
    $("body").data("current_page", current_page);
  },
  useFastTouch: true
});



// {name}


function load_gallery(id){
  $.getJSON( "/galleries/" + id + ".json", function(data){
      jQT.generateGallery("photos" + id, data);
  });
}


jQuery(function(){
  display_lists();
});

function add_to_fav(){
  $db.save($("body").data("current_page"), function(){
    $('#favourites_list').html("");
    display_fav();
  });
}

function display_fav(){
  $db.each(function(r){
    document.getElementById(r.key) ? href = "#" + r.key : href = r.uri
    var message_string= "<li><a class='slide' href='" + href + "'>" + r.uri_html.replace("/iphone/", "/iphone_thumb/") + "</a></li>";
    $('#favourites_list').append(message_string);
  });
}

function display_lists(){
  // DISPLAY NEWS
  $.getJSON( "/news.json", function(data){
    for(i=0;i<data.length; i++){
      object = data[i];
      var message_string = "<li><a class='slide' href=\"" + "/news_ajax/" + object.id + "\"><img src=\"" + object.thumbnail + "\" alt=\"\" /><div><h4>" + object.title + "</h4><span>" + object.category + " | " + object.date + "</span></div></a></li>"
      $('#news_list').append(message_string);
    }
  });
  
  // DISPLAY GALLERIES
  $.getJSON( "/galleries.json", function(data){
    for(i=0;i<data.length; i++){
      object = data[i];
      var message_string = "<li><a class='slide' href=\"" + "/gallery_ajax/" + object.id + "\"><img src=\"" + object.thumbnail + "\" alt=\"\" /><h4>" + object.title + "</h4><span>" + object.date + "</span></a></li>"
      $('#gallery_list').append(message_string);
    }
  });
  
  display_fav();
}