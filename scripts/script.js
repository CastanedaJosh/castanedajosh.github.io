

$(document).ready(function() {

  for(var i = 1; i <= 23; i++){
    $('.grid').append('<div class="grid-item"><img class="img" src="img/' + i + '.jpg"></div>');
  }


  //next line is used after the img tag in previous append function to add title , materials used, and price under image
//<p><span class="title">Title (Month/Year)</span><span>Materials Used</span><span class="price">$0000</span></p></div>

  var gutterSize = 10;

  //change gutter size to prevent movement 
  function masonOff() {

    if ($(window).width() <= 410 ) {

     $('.grid-item').width("100%");

    } else if ($(window).width() <= 450) {
      $('.grid-item').width("180px");

      // is mobile device
      gutterSize = 0;
      $grid.masonry({
        // options...
        fitWidth: true,
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: gutterSize
      });

    } else {
      $('.grid-item').width("180px");

      gutterSize = 10;

      $grid.masonry({
        // options...
        fitWidth: true,
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: gutterSize
      });

    }

  }//end of masonOff

  //fixes overlap issues of pictures, waits until images loads to put them into the grid
  var $grid = $('.grid').imagesLoaded(function() {

    // init Masonry after all images have loaded
    $grid.masonry({
      // options...
      fitWidth: true,
      itemSelector: '.grid-item',
      columnWidth: 200,
      gutter: gutterSize
    });

    //helps with overlapping issue on devices under 400px
    $grid.masonry();
    masonOff();
    $grid.masonry();

    //checks window size settings when window is resized
    $(window).resize(function() {

      masonOff();

      
      //checks box size when user resizes window
      if ($('.box').height() > $(window).height() || $('.box').width() > $(window).width()) {

        $('.box').css({
          "width": "400px",
          "height": "auto"
        });
      }

    });

  }); //end of images loaded

      $(window).on("orientationchange",function(){
         $grid.masonry();
          masonOff();

      
      //checks box size when user resizes window
      if ($('.box').height() > $(window).height() || $('.box').width() > $(window).width()) {

        $('.box').css({
          "width": "400px",
          "height": "auto"
        });
      }
    
    });


  //lightbox only works on screens above 410px, reference: http://www.tonylea.com/2011/how-to-create-your-own-jquery-lightbox/
  if ($(window).width() > 480 ) {

    //lightbox items on click function
    $('.grid-item .img').click(function() {

      $('body').append('<div onclick="close_box()" class="backdrop"></div><img onclick="close_box()" class="box" src="' + $(this).attr("src") + '"></div>');
      $('.backdrop').css('height', '' + $(document).height() + 'px');

      //get naturalHeight and naturalWidth of image reference: https://css-tricks.com/snippets/jquery/get-an-images-native-width/
      // Get on screen image
      var screenImage = $(this);

      // Create new offscreen image to test
      var theImage = new Image();
      theImage.src = screenImage.attr("src");

      // Get original/accurate measurements from images.
      var imageWidth = theImage.width;
      var imageHeight = theImage.height;
      

        //fixes "biggers than window" images by checking original width to window width
      if ($(window).width() < imageWidth ) {
        $('.box').css({
          "width": "auto",
          "height": "80%"
        });
      }

      //css for lightbox
      $('.backdrop, .box').animate({
        'opacity': '.50'
      }, 300, 'linear');
      $('.box').animate({
        'opacity': '1.00'
      }, 300, 'linear');
      $('.backdrop, .box').css('display', 'block');
      

      //checks if css settings prevent "bigger than window" image, else use different width 
      if ($('.box').height() > $(window).height() || $('.box').width() > $(window).width()) {

        $('.box').css({
          "width": "400px",
          "height": "auto"
        });
      }
    });//end of img click function

  }//end of if (screen > 410) statement 

//start of, clicking on about box changes

  var aboutText = "Residing in Phoenix, I am a current student of Arizona State University at the Herberger Institute of Design. Being 23 years young, I strive to expand on what I can do creatively as I mainly working with mix media, which includes, but not limited to, watercolors, graphite, ink, and markers. I emphasize my work mainly on human form, focusing on those in my life and around me. My medium targets color and manipulation of the human form with environments around my subjects.";

  $('#about').on('click', function() {
  //add paddding to text not box 

  //toggle main class creates a bigger div box
  $(this).toggleClass('main');
  $('#aboutText').toggleClass('animated fadeInDown aboutMargin');
    $('#about').toggleClass('animated pulse');

  //checking text in aboutText, if empty add text. Used for toggle
  $("#aboutText").text($("#aboutText").text() == aboutText ? '' : aboutText);
    $grid.masonry();
  });//end of click

//end of aboutText click function

}); //end of document ready



function close_box() {
  $('.backdrop, .box').animate({
    'opacity': '0'
  }, 300, 'linear', function() {
    $('.backdrop, .box').remove();
  });
}
