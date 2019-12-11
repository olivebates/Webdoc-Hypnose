$(document).ready(function() {
  //Set up variables
  let sBack = $("#sBack");
  let sFill = $("#sFill");
  let progress = 0;

  let page = 1;
  let yEnd = 0;
  let soundEntity = 0;

  //Load audio
  let audioFootsteps = document.createElement('audio');
  audioFootsteps.setAttribute("src", "sounds/footsteps.ogg");
  let audioFootstepsFlag = false;

  let audioSiren = document.createElement('audio');
  audioSiren.setAttribute("src", "sounds/siren.ogg");

  $(window).scroll(function(){
    //Get scroll positions
    switch(page) {
      case 1:
        yEnd = $("#page1").position().top + $("#page1").height();
      break;

      case 2:
        yEnd = $("#page2").position().top + $("#page2").height();
      break;

      case 3:
        yEnd = $(document).height();
      break;

      default:
        alert("no page ID");
        page = 1;
    }

    // Force scroll on page
    if ($(window).scrollTop()+$(window).height() > yEnd) {
      $(window).scrollTop(yEnd-$(window).height());
    }
    else {
        // Scroll Bar logic
        progress = $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
        sFill.css("width", "" + progress + "vw");
    }



  //Arrows
  $("#arrow1").on("click", function(){
    page = 2;
    $("html, body").stop().animate({scrollTop:$("#page1").position().top + $("#page1").height()}, 500, 'swing', function(){});
  });
  $("#arrow2").on("click", function(){
    page = 3;
    $("html, body").stop().animate({scrollTop:$("#page2").position().top + $("#page2").height()}, 500, 'swing', function(){});
  });
});

/*************** Youtube Iframe Player API **************/
/*** Youtube Iframe API, code from: https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player ***/
/*** Code has been altered to fit the webdoc ***/
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
