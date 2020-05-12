$(document).ready(function() {
  //Set up variables
  let sBack = $("#sBack");
  let sFill = $("#sFill");
  let progress = 0;

  let page = 1;
  let yEnd = 0;

  //Load audio
  let audioFootstepsFlag = false;
  let audio = [document.createElement('audio')];

  //Footsteps audio
  audio[0].setAttribute("src", "sounds/sFootsteps.ogg");

  //Narration audio
  for (let i = 1; i <= 8; i++) {
    audio.push(document.createElement('audio'));
    audio[i].setAttribute("src", "sounds/sKeld" + i + ".ogg");
  }

  function fPlayButtonSwitch(element) {
    let curAtt = element.attr("src");

    switch (curAtt) {
      case "images/play1.png":
        element.attr("src", "images/pause1.png");
      break;

      case "images/play2.png":
        element.attr("src", "images/pause2.png");
      break;

      case "images/pause1.png":
        element.attr("src", "images/play1.png");
      break;

      case "images/pause2.png":
        element.attr("src", "images/play2.png");
      break;

      default:
        alert("incorrect playbutton image-file: " + curAtt);
    }
  }

  // Sound Button Listeners
  let buttonElement = 0;
  for (let i = 1; i <= 8; i++) {
    // Button logic
    buttonElement = $("#keld"+i);
    buttonElement.on("click", function(){

      // Save variables
      let myID = i;
      let myTag = $("#keld"+myID);

      //Stop footsteps sound
      if (audio[0].paused == false) {
        audio[0].pause();
      }

      //Stop other sounds
      for (let ii = 1; ii <=8; ii++) {
        if (ii == myID) {
          continue;
        }

        if (audio[ii].paused == false) {
          audio[ii].pause();
          audio[ii].currentTime = 0;
          fPlayButtonSwitch($("#keld"+ii));
        }
      }

      //Play my sound
      if (audio[myID].paused == true) {
        audio[myID].play();
        fPlayButtonSwitch(myTag);
      }
      else {
        audio[myID].pause();
        fPlayButtonSwitch(myTag);
      }
    });

    // Sound end
    $(audio[i]).on("ended", function() {
      let myID = i;
      audio[myID].paused = true;
      audio[myID].currentTime = 0;
      fPlayButtonSwitch($("#keld"+myID));
    });
  }

  let page1 = $("#page1");
  let page2 = $("#page2");
  let page3 = $("#page3");
  $(window).scroll(function(){
      // Play footstepSound
      /*if ($("#footstepSound").position().top < $(window).scrollTop() + $(window).height())
      {
        if (audioFootstepsFlag == false) {
          audio[0].play();
          audioFootstepsFlag = true;
        }
      }*/

    //Get scroll positions
    switch(page) {
      case 1:
        yEnd = page1.position().top + page1.height();
      break;

      case 2:
        yEnd = page3.position().top + page3.height() - window.innerHeight*1.1;
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
  });

  //Arrows
  $("#arrow1").on("click", function(){
    page = 2;
    $("html, body").stop().animate({scrollTop:page1.position().top + page1.height()}, 500, 'swing', function(){});
  });
  $("#arrow2").on("click", function(){
    page = 3;
    $("html, body").stop().animate({scrollTop:page3.position().top + page3.height() - window.innerHeight*1.1}, 500, 'swing', function(){});
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
    videoId: 'TpU1lJEa034'
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
