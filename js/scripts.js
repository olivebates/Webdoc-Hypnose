$(document).ready(function() {
  //Set up variables
  let sBack = $("#sBack");
  let sFill = $("#sFill");
  let progress = 0;

  let page = 1;
  let yStart = 0;
  let yEnd = 0;

  $(window).scroll(function(){
    //Get scroll positions
    switch(page) {
      case 1:
        yStart = 0;
        yEnd = $("#page1").position().top + $("#page1").height();
      break;

      case 2:
        yStart = $("#page1").height();
        yEnd = $("#page2").position().top + $("#page2").height();
      break;

      case 3:
        yStart = $("#page2").position().top + $("#page2").height();
        yEnd = $("#page3").position().top + $("#page3").height();
      break;

      case 3:
        yStart = $("#page1").height() + $("#page2").height() + $("#page3").height();
        yEnd = $("#page1").height() + $("#page2").height() + $("#page3").height() + $("#page4").height();
      break;
    }

    // Force scroll on page
    if ($(window).scrollTop() < yStart) {
      $(window).scrollTop(yStart);
    }
    else if ($(window).scrollTop()+$(window).height() > yEnd) {
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
    $("html, body").stop().animate({scrollTop:$("#page1").height()}, 500, 'swing', function(){});
  });
  $("#arrow2").on("click", function(){
    page = 3;
    $("html, body").stop().animate({scrollTop:$("#page2").position().top + $("#page2").height()}, 500, 'swing', function(){});
  });

  //Update background positions
  function updateBackground(){
      $("#divider1").css("height", "" + ($("#page1").height() - $("#bg1").height()) + "px");
      $("#divider2").css("height", "" + ($("#page2").position().top + $("#page2").height() - $("#bg2").height() - $("#bg1").height()) + "px");
      setTimeout(updateBackground, 100);
  }
  updateBackground();

  //Force stop scrolling

});
