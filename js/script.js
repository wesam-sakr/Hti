// $('.owl-carousel').addClass('owl-rtl')
// $('html').attr('dir', 'rtl');
// $('html').attr('lang', 'ar');
// $('link[href="css/bootstrap.min.css"]').attr('href', 'css/bootstrap.rtl.min.css');

// dir
var bodyDir = $('body').css('direction')
var dirAr
if (bodyDir == "rtl") {
  dirAr = true
}
else {
  dirAr = false
}

// loader
$('#loading').fadeOut(3000);

// make navbar fixed while scrolling
$(document).ready(function () {

  if ($(".scroll-text").length > 0) {
    // 1) تقسيم كل جملة لـ حروف داخل span
    $(".scroll-text").each(function () {
      let text = $(this).text().trim();
      let html = "";
      for (let i = 0; i < text.length; i++) {
        html += `<span>${text[i]}</span>`;
      }
      $(this).html(html);
    });

    // 2) التلوين مع الاسكرول
    $(window).on("scroll", function () {

      let section = $("#text-section");
      let offsetTop = section.offset().top;
      let sectionHeight = section.outerHeight();
      let scrollPos = $(window).scrollTop();
      let windowHeight = $(window).height();

      // نسبة دخول السكشن (0 → 1)
      let progress = (scrollPos + windowHeight - offsetTop) / (sectionHeight + windowHeight);

      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      // اجمع كل الحروف
      let allChars = section.find("span");
      let charsCount = allChars.length;

      // عدد الحروف اللي تتلون
      let coloredChars = Math.floor(charsCount * progress);

      // شيل التلوين من الكل
      allChars.removeClass("active");

      // فعّل التلوين حسب التقدم
      allChars.slice(0, coloredChars).addClass("active");

    });

  }

  let started = false;
  function animateCounters() {
    $('.counter').each(function () {
      let $this = $(this);
      let target = +$this.attr('data-target');

      $({ countNum: $this.text() }).animate(
        { countNum: target },
        {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        }
      );
    });
  }

  if ($('#stats').length > 0) {
    $(window).on('scroll', function () {
      let top = $('#stats').offset().top - window.innerHeight + 100;
      if (!started && $(window).scrollTop() > top) {
        animateCounters();
        started = true;
      }
    });

  }

});





$(document).ready(function () {
  var main = $(".one");
  var thumbs = $(".two");
  var syncedSecondary = true;

  // السلايدر الرئيسي
  main.owlCarousel({
    items: 1,
    slideSpeed: 1000,
    nav: false,
    autoplay: true,
    dots: false,
    stagePadding: 0,
    loop: true,
    rtl: dirAr, // اتجاه عربي
  }).on("changed.owl.carousel", syncPosition);

  // السلايدر الثاني (الثمبنيلز)
  thumbs
    .on("initialized.owl.carousel", function () {
      thumbs.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: 4, // عدد الصور الصغيرة
      dots: false,
      nav: true,
      rtl: dirAr,
      margin: 5,
      stagePadding: 0,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: 4,
      navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>']
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) current = count;
    if (current > count) current = 0;

    thumbs.find(".owl-item").removeClass("current").eq(current).addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs.find(".owl-item.active").first().index();
    var end = thumbs.find(".owl-item.active").last().index();

    if (current > end) {
      thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      main.data("owl.carousel").to(number, 100, true);
    }
  }

  thumbs.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    main.data("owl.carousel").to(number, 300, true);
  });

  $('.industries .owl-carousel').owlCarousel({
    autoplay: true,
    rewind: false,
    margin: 20,
    stagePadding: 180,
    loop: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 1400,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    nav: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
      },
      600: {
        items: 2,
        stagePadding: 70,
      },
      1024: {
        items: 2
      }
    }
  });

  $('.talent-slider .owl-carousel').owlCarousel({
    margin: 16,
    responsiveClass: true,
    rtl: dirAr,
    nav: false,
    autoplay: true,
    loop: true,
    animateIn: 'fadeInLeft',
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      }
    }
  });

  // apply job upload cv
  $(".file-input").change(function () {
    const fileInput = $(this).find('[type="file"]')[0];
    const label = $(this).find("[data-js-label]")[0];
    console.log($(fileInput).val());
    if (!$(fileInput).val()) return;
    var value = $(fileInput)
      .val()
      .replace(/^.*[\\\/]/, "");
    $(label).html(value);
  });


  // scroll to top page
  var btn_top = $('#scrollUp');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn_top.show();
    } else {
      btn_top.hide();
    }
  });

  $('select').select2();

  $('[data-fancybox]').fancybox({
    buttons: [
      "zoom",
      "share",
      "slideShow",
      "fullScreen",
      "download",
      "thumbs",
      "close"
    ]
  });
});






