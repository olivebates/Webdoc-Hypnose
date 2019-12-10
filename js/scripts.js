$(document).ready(function() {
  //Set up variables
  let sBack = $("#sBack");
  let sFill = $("#sFill");
  let progress = 0;


  let audio = $(document).createElement("audio");


  let page = 1;
  let yEnd = 0;

  $(window).scroll(function(){
    //Get scroll positions
    switch(page) {
      case 1:
        yEnd = $("#page1").position().top + $("#page1").height()
      break;

      case 2:
        yEnd = $("#page2").position().top + $("#page2").height();
      break;

      case 3:
        yEnd = $("#page3").position().top + $("#page3").height();
      break;

      case 4:
        yEnd = $("#page1").height() + $("#page2").height() + $("#page3").height() + $("#page4").height();
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

    //Sound logic
    if ($(window).scrollTop() + $(window).height() > $("#footstepSound"))
    {
      audio.setAttribute("src", "sounds/footsteps.ogg");
      audio.play();
    }
  });

  //Arrows
  $("#arrow1").on("click", function(){
    page = 2;
    $("html, body").stop().animate({scrollTop:$("#page1").position().top + $("#page1").height()}, 500, 'swing', function(){});
  });
  $("#arrow2").on("click", function(){
    page = 3;
    $("html, body").stop().animate({scrollTop:$("#page2").position().top + $("#page2").height()}, 500, 'swing', function(){});
  });
  $("#arrow3").on("click", function(){
    page = 4;
    $("html, body").stop().animate({scrollTop:$("#page3").position().top + $("#page3").height()}, 500, 'swing', function(){});
  });

  //Update background positions
  /*function updateBackground(){
      $("#divider1").css("height", "" + ($("#page1").height() - $("#bg1").height()) + "px");
      $("#divider2").css("height", "" + ($("#page2").position().top + $("#page2").height() - $("#bg2").height() - $("#bg1").height()) + "px");
      setTimeout(updateBackground, 100);
  }
  updateBackground();*/

  //Force stop scrolling

});
