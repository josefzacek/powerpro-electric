// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// close navbar on link click (for mobile)
var mainNavigation = document.getElementById("navbarNav");
var mainNavigationLinks = document.querySelectorAll("a.nav-link");
var mainNavigationToggler = document.querySelector(".navbar-toggler");
mainNavigationLinks.forEach(function(e){
  e.addEventListener('click', function (event) {
    mainNavigationToggler.classList.add("collapsed");
    mainNavigation.classList.remove("show");
  })    
});

// Initialize Slick Slider for Testimonials
$(document).ready(function(){
  $('.testimonials-slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: $('.custom-slick-prev-button'),
    nextArrow: $('.custom-slick-next-button'),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});
