window.addEventListener('load', (event) => {
	var links = document.links;
	for (let i = 0, linksLength = links.length ; i < linksLength ; i++) {
	  if (links[i].hostname !== window.location.hostname) {
	    links[i].target = '_blank';
	    links[i].rel = 'noreferrer noopener';
	  }
	}
});


document.addEventListener('DOMContentLoaded', () => {
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

    document.querySelectorAll('.testimonials__content').forEach(function(content) {
      const overlay = content.nextElementSibling;
      if (!overlay) return;

      const styles = getComputedStyle(content);
      const contentHeight = content.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      if (contentHeight < 180) {
        overlay.classList.add('hidden')
      }

      content.addEventListener('scroll', function() {
        if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
          overlay.classList.add('hidden')
        } else {
          overlay.classList.remove('hidden')
        }
      })
    })

    // Videos hub

    const Shuffle = window.Shuffle; // Assumes you're using the UMD version of Shuffle (for example, from unpkg.com).
    const element = document.getElementById('videos_list');
    if(element && typeof Shuffle === 'function') {

      const shuffleInstance = new Shuffle(element, {
        itemSelector: '.video-product-hub',
      });

      const filterButtons = document.querySelectorAll('.js-filter-button');
      filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          filterButtons.forEach(function(other) {
            other.classList.remove('active');
          });
          button.classList.add('active');

          shuffleInstance.filter(button.dataset.category);
        })
      })


      // Get the fragment from the URL
      var fragment = window.location.hash;

      if(fragment) {
        var link = document.querySelector('a[href="'+fragment+'"]');
        if(link) {
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
    document.querySelectorAll('.js-toggle-comments').forEach(function(button) {
      button.addEventListener('click', function() {

        const label = button.querySelector('.article__comments-button-label');

        button.classList.toggle('active')
        if (button.nextElementSibling) {
          button.nextElementSibling.classList.toggle('active')
        }

        if (label) {
          if (button.classList.contains('active')) {
            label.textContent = 'Leave the conversation'
          } else {
            label.textContent = 'Join the conversation'
          }
        }
      })
    })

})
