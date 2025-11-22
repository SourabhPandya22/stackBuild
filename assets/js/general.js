$(document).ready(function () {
  // Open modal when clicking select box
  $('#citySelect').on('click', function (e) {
    e.preventDefault();
    $('#cityModal').modal('show');
  });

  // Select city
  $(document).on('click', '.city-item', function () {
    $('.city-item').removeClass('active');
    $(this).addClass('active');

    const selectedCity = $(this).text();
    $('#citySelect').html(`<option value="${selectedCity}" selected>${selectedCity}</option>`);
    $('#cityModal').modal('hide');
  });


  $('#cityModal').on('show.bs.modal', function () {
      setTimeout(function () {
          $('.modal-backdrop').addClass('city-backdrop');
      }, 10);
  });

  $('#cityModal').on('hidden.bs.modal', function () {
      $('.modal-backdrop').removeClass('city-backdrop');
  });


  initTestimonialSlider();


  $(".read-more-btn").on("click", function (e) {
    e.preventDefault();

    $(".read-more-info").slideDown(300);
    $(this).hide();                     // hide Read More
    $(".collapse-btn").show();          // show Collapse
  });

  $(".collapse-btn").on("click", function (e) {
    e.preventDefault();

    $(".read-more-info").slideUp(300);
    $(this).hide();                     // hide Collapse
    $(".read-more-btn").show();         // show Read More
  });
});


var testimonialSlider = null;

function initTestimonialSlider() {
  var screenWidth = $(window).width();

  if (screenWidth > 768 && testimonialSlider === null) {
    testimonialSlider = new Swiper(".testiminial-slider", {
      slidesPerView: 1,
      spaceBetween: 27,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 27,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    console.log("Swiper initialized");
  }
  else if (screenWidth <= 768 && testimonialSlider !== null) {
    testimonialSlider.destroy(true, true);
    testimonialSlider = null;
    console.log("Swiper destroyed on small screen");
  }
}


$(window).on("resize", function () {
  initTestimonialSlider();
});