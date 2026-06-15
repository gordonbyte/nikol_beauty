window.addEventListener('load', (event) => {
	var links = document.links;
	for (let i = 0, linksLength = links.length ; i < linksLength ; i++) {
	  if (links[i].hostname !== window.location.hostname) {
	    links[i].target = '_blank';
	    links[i].rel = 'noreferrer noopener';
	  }
	}
});


document.addEventListener("DOMContentLoaded", () => {
  const upsellButton = document.querySelector(".bcsell-upsell-btn");
  const quantityCounter = document.querySelector("quantity-counter");
  if (upsellButton && quantityCounter) {
    upsellButton.addEventListener("click", () => {

      setTimeout(() => {
        quantityCounter.updateCart();
      }, 500);
    });
  } 
});

$(document).ready( () => {
	  /* Hero slider */
    let sliderMain = document.querySelectorAll('.hero-slider .swiper-container')
    let sliderPagination  = document.querySelectorAll('.hero-slider .swiper-pagination')
    let sliderNext  = document.querySelectorAll('.hero-slider .swiper-next')
    let sliderPrev = document.querySelectorAll('.hero-slider .swiper-prev')

    let mainArray  = [];

    sliderMain.forEach(function(element, i) {
      mainArray.push(
        new Swiper(element, {
          spaceBetween: 0,
          loop: false,
          slidesPerView: 1,
          freeMode: false,
          watchSlidesVisibility: true,
          navigation: {
            nextEl: sliderNext[i],
            prevEl: sliderPrev[i]
          },
          on: {
            init: function(){
              let self = this;
              setTimeout(function(){
                self.update();
              }, 100)
            },
          },
        })
      );
    });

    $('.hero-slider__title').mouseover(function() {
    	$(this).parent().parent().addClass('hover')
    })

    $('.hero-slider__title').mouseout(function() {
    	$(this).parent().parent().removeClass('hover')
    })

    /* Testimonials slider */
    let sliderTestimonials = document.querySelectorAll('.testimonials .swiper-container')
    let sliderTestimonialsNext  = document.querySelectorAll('.testimonials .swiper-next')
    let sliderTestimonialsPrev = document.querySelectorAll('.testimonials .swiper-prev')

    let testimonialsSlidersArray  = [];

    sliderTestimonials.forEach(function(element, i) {
      testimonialsSlidersArray.push(
        new Swiper(element, {
          spaceBetween: 40,
          loop: true,
          slidesPerView: 1,
          freeMode: false,
          watchSlidesVisibility: true,
          navigation: {
            nextEl: sliderTestimonialsNext[i],
            prevEl: sliderTestimonialsPrev[i]
          },
          breakpoints: {
            787: {
              slidesPerView: 3
            }
          },
          on: {
            init: function(){
              let self = this;
              setTimeout(function(){
                self.update();
              }, 100)
            },
          },
        })
      );
    });

    /* Filters slider */
    let sliderFilters = document.querySelectorAll('.videos-filter .swiper-container')

    let filtersSlidersArray  = [];

    sliderFilters.forEach(function(element, i) {
      filtersSlidersArray.push(
        new Swiper(element, {
          spaceBetween: 40,
          loop: false,
          slidesPerView: 'auto',
          freeMode: true,
          watchSlidesVisibility: true,
          on: {
            init: function(){
              let self = this;
              setTimeout(function(){
                self.update();
              }, 100)
            },
          },
        })
      );
    });


  
    /* review product swiper */
    let swiperReview = document.querySelectorAll('.review-cards .swiper-container')

    let reviewSlidersArray  = [];

    swiperReview.forEach(function(element, i) {
      reviewSlidersArray.push(
        new Swiper(element, {
          spaceBetween: 20,
          loop: true,
          slidesPerView: 1,
          watchSlidesVisibility: true,
          autoplay: {
            delay: 66000, 
            disableOnInteraction: false, 
          },
          pagination: {
            el: '.swiper-pagination', 
            clickable: true, 
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
          },
          on: {
            init: function(){
              let self = this;
              setTimeout(function(){
                self.update();
              }, 100)
            },
          },
        })
      );
    });


  
    // Testimonials

    $('.testimonials__content').each(function(){
      console.log($(this).height() )
      if($(this).height() < 180) {
        $(this).next().addClass('hidden')
      }
    })

    $('.testimonials__content').on('scroll', function() {
      let $overlay = $(this).next();
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        $overlay.addClass('hidden')
      } else {
        $overlay.removeClass('hidden')
      }
    })

    // Videos hub

    const Shuffle = window.Shuffle; // Assumes you're using the UMD version of Shuffle (for example, from unpkg.com).
    const element = document.getElementById('videos_list');
    if(element) {

      const shuffleInstance = new Shuffle(element, {
        itemSelector: '.video-product-hub',
      });

      $('.js-filter-button').click(function() {
        $('.js-filter-button').removeClass('active');
        $(this).addClass('active');

        shuffleInstance.filter($(this).data('category'));
      })


      // Get the fragment from the URL
      var fragment = window.location.hash;

      if(fragment) {
        var link = document.querySelector('a[href="'+fragment+'"]');
        link.click();

        var offset = 150; // Padding value (adjust as needed)

        setTimeout(function() {
          
          var targetElement = document.getElementById('videos_list');
          var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          var adjustedPosition = targetPosition - offset;

          window.scrollTo({ top: adjustedPosition, behavior: 'smooth' });

  
        }, 100)
        
      }
    }  

    /* Testimonials slider */
    let sliderProducts = document.querySelectorAll('.video-product-hub .swiper-container')
    let sliderProductsNext  = document.querySelectorAll('.video-product-hub .swiper-next')
    let sliderProductssPrev = document.querySelectorAll('.video-product-hub .swiper-prev')

    let productsSlidersArray  = [];

    sliderProducts.forEach(function(element, i) {
      productsSlidersArray.push(
        new Swiper(element, {
          spaceBetween: 0,
          loop: true,
          slidesPerView: 1,
          freeMode: false,
          watchSlidesVisibility: true,
          navigation: {
            nextEl: sliderProductsNext[i],
            prevEl: sliderProductssPrev[i]
          },
          on: {
            init: function(){
              let self = this;
              setTimeout(function(){
                self.update();
              }, 100)
            },
          },
        })
      );
    });

    // Comments
    $('.js-toggle-comments').click(function() {

      const label = $(this).find('.article__comments-button-label');

      $(this).toggleClass('active')
      $(this).next().toggleClass('active')

      if($(this).hasClass('active')) {
        label.text('Leave the conversation')
      } else {
        label.text('Join the conversation')
      }
    })

    const $aboutPage = $('#about')

    if($aboutPage.length) {
      const $headerWrapper = $('.header__wrapper')
      const pageHeight = window.innerHeight;

      window.onscroll = function() {
        var scrollLimit = 100;
        if (window.scrollY >= pageHeight) {
          // alert("x")
          $headerWrapper.css('position', 'fixed');
        } else {
          $headerWrapper.css('position', 'relative')
        }
      };

    }

    function toggleButton() {
      var checkbox = document.getElementById("agree_cart");
      var button = document.getElementById("checkout_button");

      if (checkbox.checked) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    }

    var checkbox = document.getElementById("agree_cart");
    checkbox.addEventListener("click", toggleButton);
})