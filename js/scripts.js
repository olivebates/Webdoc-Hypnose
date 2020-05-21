$(document).ready(function() {
  //Set up variables
  //let sBack = $("#sBack");
  //let sFill = $("#sFill");
  let progress = 0;

  let started = false;
  let yEnd = 0;

  //Load audio
  //let audioFootstepsFlag = false;
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

  let heroImage = $("#page1");
  $(window).scroll(function(){
    //Get scroll positions
    if (started == false) {
      yEnd = heroImage.position().top + heroImage.height();
    }
    else {
      yEnd = $(document).height();
    }

    // Force scroll on page
    if ($(window).scrollTop()+$(window).height() > yEnd) {
      $(window).scrollTop(yEnd-$(window).height());
    }
  });

  //Arrow
  $("#arrow1").on("click", function(){
    started = true;
    $("html, body").stop().animate({scrollTop:heroImage.position().top + heroImage.height()}, 500, 'swing', function(){});
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
