var jQT = new $.jQTouch({
  startupScreen:"/iphone/images/splash.png",
  statusBar:'default',
  icon:'/iphone/images/icon.png',
  preloadImages:[
  ],
  fullScreenClass: "fullscreen"
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

jQuery(function() {
  // Add custom handler code here.
  // $('.no_scroll').bind("touchmove", {}, function(event){
  //   event.preventDefault();
  // });
  // $("#your_message").bind("focus", {}, setTextareaState);
  //$("#gallery").bind("pageAnimationEnd", {}, function(alert(1)));
  
  display_lists();
});


function display_lists(){
  
}






function render_mail(data, info){
  $mail_container = $("#mail_container");
  if($mail_container.data("loaded")) return;
  if (info.direction == "in"){
    $.getJSON( "/demos/tesco/mail.json", function(data){
      $(".loading").fadeOut("slow");
      for(i=0;i<data.length; i++){
        var message = data[i].message;
        message_string = '<li><a class="cube" href="' +message.url + '"><em>&nbsp;</em><h2>' + message.subject + '</h2><span>' + message.created_at.split("T")[0] + '</span></a></li>'
        $('#mail_list').append(message_string);
      }
      $mail_container.data("loaded", true);
    });
  }

}