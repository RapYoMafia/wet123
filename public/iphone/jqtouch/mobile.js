var jQT = new $.jQTouch({
  startupScreen:"/iphone/images/splash.png",
  statusBar:'default',
  icon:'/iphone/images/icon.png',
  preloadImages:[
  ],
  fullScreenClass: "fullscreen",
  onAjaxPageLoaded: function(){
    // for article
    jQT.init_iScroll();
    
  },
  useFastTouch: true
});

// jQuery(function(){
//   jQT.generateGallery("happening_2",[
//      {src:"/demos/heineken/images/happening_2/1.jpg"},
//      {src:"/demos/heineken/images/happening_2/2.jpg"},
//      {src:"/demos/heineken/images/happening_2/3.jpg"},
//      {src:"/demos/heineken/images/happening_2/4.jpg"},
//      {src:"/demos/heineken/images/happening_2/5.jpg"}
//     ]);
// });
// 

jQuery(function(){
  // Add custom handler code here.
  // $('.no_scroll').bind("touchmove", {}, function(event){
  //   event.preventDefault();
  // });
  // $("#your_message").bind("focus", {}, setTextareaState);
  //$("#gallery").bind("pageAnimationEndz", {}, function(alert(1)));
  
  display_lists();
});


function display_lists(){
  // DISPLAY NEWS
  $.getJSON( "/news.json", function(data){
    for(i=0;i<data.length; i++){
      object = data[i];
      message_string = "<li><a class='slide' href=\"" + "/news_ajax/" + object.id + "\"><img src=\"" + object.thumbnail + "\" alt=\"\" /><h4>" + object.title + "</h4><span>" + object.category + " | " + object.date + "</span></a></li>"
      $('#news_list').append(message_string);
    }
  });
  
  // DISPLAY GALLERIES
  $.getJSON( "/galleries.json", function(data){
    for(i=0;i<data.length; i++){
      object = data[i];
      message_string = "<li><a class='slide' href=\"" + "/gallery_ajax/" + object.id + "\"><img src=\"" + object.thumbnail + "\" alt=\"\" /><h4>" + object.title + "</h4><span>" + object.date + "</span></a></li>"
      $('#gallery_list').append(message_string);
    }
  });
  
}


// function render_mail(data, info){
//   $mail_container = $("#mail_container");
//   if($mail_container.data("loaded")) return;
//   if (info.direction == "in"){
//     $.getJSON( "/demos/tesco/mail.json", function(data){
//       $(".loading").fadeOut("slow");
//       for(i=0;i<data.length; i++){
//         var message = data[i].message;
//         message_string = '<li><a class="cube" href="' +message.url + '"><em>&nbsp;</em><h2>' + message.subject + '</h2><span>' + message.created_at.split("T")[0] + '</span></a></li>'
//         $('#mail_list').append(message_string);
//       }
//       $mail_container.data("loaded", true);
//     });
//   }
// }