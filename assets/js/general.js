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

    $(document).on("keydown", "#phone, .otp-input", function (e) {
        // Allow control keys
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 46]) !== -1 ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }

        // Prevent anything other than numbers
        if ((e.keyCode < 48 || e.keyCode > 57) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
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


    // CLICK event → open file input
    $("#uploadBox").click(function () {
        $("#fileInput").click();
    });

    // FILE input change
    $("#fileInput").on("change", function (e) {
        handleFiles(e.target.files);
    });

    // Prevent default browser drag behavior globally
    $(document).on("dragover drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    // DRAG OVER highlight
    $("#uploadBox").on("dragover", function (e) {
        e.preventDefault();
        $(this).css("background", "#fff2e6");
    });

    $("#uploadBox").on("dragleave", function () {
        $(this).css("background", "#fff");
    });

    // DROP files
    $("#uploadBox").on("drop", function (e) {
        e.preventDefault();
        $(this).css("background", "#fff");

        let files = e.originalEvent.dataTransfer.files;
        handleFiles(files);
    });

    // FILE PREVIEW FUNCTION
    function handleFiles(files) {
        $.each(files, function (i, file) {
            let url = URL.createObjectURL(file);

            let previewHtml = `
                <div class="preview-item">
                    ${file.type.startsWith("video") ?
                    `<video src="${url}" muted></video>` :
                    `<img src="${url}">`
                }
                    <div class="remove-btn">&times;</div>
                </div>
            `;

            $("#previewList").append(previewHtml);
        });
    }

    // REMOVE PREVIEW
    $(document).on("click", ".remove-btn", function () {
        $(this).parent().remove();
    });

    $(".otp-wrapper").hide();
    // Replace button with OTP field
    $("#verifyBtn").click(function () {
        $(this).hide();
        $(".otp-wrapper").show();
        $("#otpRealInput").focus();
    });

    // Update underline boxes on typing
    $("#otpRealInput").on("input", function () {

        let val = $(this).val().replace(/[^0-9]/g, "").slice(0, 4);
        $(this).val(val);

        let digits = val.split("");

        $(".otp-box span").each(function (index) {
            if (digits[index]) {
                $(this).text(digits[index]).addClass("filled");
            } else {
                $(this).text("").removeClass("filled");
            }
        });
    });

    // Click underline box to focus input
    $(".otp-box").click(function () {
        $("#otpRealInput").focus();
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