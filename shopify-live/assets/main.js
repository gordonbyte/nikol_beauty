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
      const reviewSection = element.closest('.review-cards');
      const reviewSpeed = (parseInt(reviewSection && reviewSection.dataset.autoplaySpeed, 10) || 10) * 1000;
      const reviewReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const reviewSwiper = new Swiper(element, {
          spaceBetween: 20,
          loop: true,
          slidesPerView: 1,
          watchSlidesVisibility: true,
          // Auto-rotates at the section's "Auto-rotate speed" setting; the
          // pause/play toggle is the WCAG 2.2.2 control. Reduced-motion
          // users start paused.
          autoplay: {
            delay: reviewSpeed,
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
                if (reviewReducedMotion) self.autoplay.stop();
              }, 100)
            },
          },
        });

      const reviewToggle = reviewSection && reviewSection.querySelector('[data-review-autoplay-toggle]');
      if (reviewToggle) {
        const setToggleState = function (playing) {
          reviewToggle.classList.toggle('is-paused', !playing);
          reviewToggle.setAttribute('aria-label', playing ? 'Pause review rotation' : 'Play review rotation');
        };
        setToggleState(!reviewReducedMotion);
        reviewToggle.addEventListener('click', function () {
          if (reviewToggle.classList.contains('is-paused')) {
            reviewSwiper.autoplay.start();
            setToggleState(true);
          } else {
            reviewSwiper.autoplay.stop();
            setToggleState(false);
          }
        });
      }

      reviewSlidersArray.push(reviewSwiper
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
            other.removeAttribute('aria-current');
          });
          button.classList.add('active');
          button.setAttribute('aria-current', 'true');

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

    /* Video product sliders — init deferred until scrolled near view */
    let sliderProducts = document.querySelectorAll('.video-product-hub .swiper-container')
    let sliderProductsNext  = document.querySelectorAll('.video-product-hub .swiper-next')
    let sliderProductssPrev = document.querySelectorAll('.video-product-hub .swiper-prev')

    let productsSlidersArray  = [];

    function initProductSlider(element, i) {
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
    }

    if ('IntersectionObserver' in window) {
      let productSliderObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          productSliderObserver.unobserve(entry.target);
          let i = Array.prototype.indexOf.call(sliderProducts, entry.target);
          initProductSlider(entry.target, i);
        });
      }, { rootMargin: '200px 0px' });

      sliderProducts.forEach(function(element) {
        productSliderObserver.observe(element);
      });
    } else {
      sliderProducts.forEach(initProductSlider);
    }

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

});

// ARIA tab semantics for Broadcast tab UIs (related-products tabs, product
// description tabs): stock theme.js only swaps CSS classes, so assistive
// tech never hears the tab roles or the selected state.
(function () {
  function enhanceTabs() {
    document.querySelectorAll('[data-tabs-holder]').forEach(function (holder, index) {
      var tabs = holder.querySelectorAll('.tab-link');
      var panels = holder.querySelectorAll('.tab-content');
      if (!tabs.length || !panels.length) return;

      var list = holder.querySelector('.tabs');
      if (list) list.setAttribute('role', 'tablist');

      var uid = 'aria-tabs-' + index;

      tabs.forEach(function (tab) {
        var i = tab.getAttribute('data-tab');
        tab.setAttribute('role', 'tab');
        if (!tab.id) tab.id = uid + '-tab-' + i;
        tab.setAttribute('aria-controls', uid + '-panel-' + i);
        tab.setAttribute('aria-selected', tab.classList.contains('current') ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        var i = panel.getAttribute('data-tab-index');
        if (i === null) {
          var match = panel.className.match(/tab-content-(\d+)/);
          i = match ? match[1] : null;
        }
        if (i === null) return;
        panel.setAttribute('role', 'tabpanel');
        if (!panel.id) panel.id = uid + '-panel-' + i;
        panel.setAttribute('aria-labelledby', uid + '-tab-' + i);
      });

      holder.addEventListener('click', function (event) {
        if (!event.target.closest('.tab-link')) return;
        setTimeout(function () {
          tabs.forEach(function (tab) {
            tab.setAttribute('aria-selected', tab.classList.contains('current') ? 'true' : 'false');
          });
        }, 0);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceTabs);
  } else {
    enhanceTabs();
  }
})();

// The PDP title rating badge pointed at Judge.me's long-gone reviews anchor
// (and theme.js's scroll-to module ignores links and isn't registered on the
// product section anyway) — scroll it to the Junip reviews block instead.
(function () {
  document.addEventListener('click', function (event) {
    var badge = event.target.closest('.product__badge-link');
    if (!badge) return;
    var reviews = document.querySelector('.junip-product-review, [id*="junip_product_review"]');
    if (!reviews) return;
    event.preventDefault();
    reviews.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

// Cart drawer free-shipping truck (KAN-31): every time the drawer opens, the
// progress bar refills from 0 to the cart's percentage with the truck riding
// the leading edge. theme.js writes the real percent into the <progress>
// element; we capture it as the drive-in target and take over the rendering
// (the theme's own scaleX/width transitions are disabled in main.css so bar
// and truck stay locked frame-by-frame).
(function () {
  var DURATION = 1200;
  var raf = null;
  var lastValue = null;

  function getParts() {
    var wrap = document.querySelector('.drawer__message.free-shipping');
    if (!wrap) return null;
    var bar = wrap.querySelector('[data-progress-bar]');
    var truck = wrap.querySelector('[data-shipping-truck]');
    if (!bar || !truck) return null;
    return { wrap: wrap, bar: bar, truck: truck };
  }

  // Unitless fraction of the bar's width; the CSS multiplies it against the
  // bar's actual length (100% - 9px) so the wheel stays on the fill edge.
  function clampPos(percent) {
    return (Math.max(5, Math.min(100, percent)) / 100).toFixed(4);
  }

  function paint(parts, value) {
    parts.bar.value = value;
    parts.truck.style.setProperty('--truck-frac', clampPos(value));
    parts.truck.classList.toggle('show-trophy', value >= 99.9);
    parts.wrap.classList.toggle('confetti-go', value >= 99.9);
    lastValue = value;
  }

  function pulseAmount(parts) {
    var amount = parts.wrap.querySelector('[data-left-to-spend]');
    if (!amount) return;
    amount.classList.remove('is-pulsing');
    void amount.offsetWidth;
    amount.classList.add('is-pulsing');
  }

  function currentTarget(parts) {
    var stored = parseFloat(parts.bar.dataset.truckTarget);
    var value = isNaN(stored) ? parseFloat(parts.bar.value) : stored;
    if (isNaN(value)) value = 0;
    return Math.max(0, Math.min(100, value));
  }

  function animateTo(parts, target, from, duration) {
    from = typeof from === 'number' ? from : 0;
    duration = duration || DURATION;
    if (raf) cancelAnimationFrame(raf);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(parts, target);
      return;
    }
    var start = null;
    paint(parts, from);
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      paint(parts, from + (target - from) * eased);
      raf = p < 1 ? requestAnimationFrame(frame) : null;
    }
    raf = requestAnimationFrame(frame);
  }

  function driveIn() {
    var parts = getParts();
    if (!parts) return;
    // The drawer's own slide-in + content reveal takes ~half a second; pulse
    // after it so the pulse is actually visible.
    setTimeout(function () {
      pulseAmount(parts);
    }, 600);
    // The theme opens the drawer before its own cart refresh lands, so the
    // <progress> value can be one update behind — fetch the real total.
    var limit = parseFloat(parts.wrap.getAttribute('data-free-shipping-limit'));
    var rate = (window.Shopify && window.Shopify.currency && parseFloat(window.Shopify.currency.rate)) || 1;
    var limitCents = limit * 100 * rate;
    fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(function (response) { return response.json(); })
      .then(function (cart) {
        var target = limitCents > 0 ? Math.min((cart.total_price / limitCents) * 100, 100) : 100;
        parts.bar.dataset.truckTarget = target;
        animateTo(parts, target);
      })
      .catch(function () {
        animateTo(parts, currentTarget(parts));
      });
  }

  function syncTarget() {
    if (raf !== null) return;
    var parts = getParts();
    if (!parts) return;
    parts.bar.dataset.truckTarget = parts.bar.value;
    var value = parseFloat(parts.bar.value) || 0;
    parts.truck.style.setProperty('--truck-frac', clampPos(value));
    parts.truck.classList.toggle('show-trophy', value >= 99.9);
    parts.wrap.classList.toggle('confetti-go', value >= 99.9);
  }

  document.addEventListener('theme:cart-drawer:open', function () {
    requestAnimationFrame(driveIn);
  });
  document.addEventListener('theme:cart:load', syncTarget);
  document.addEventListener('DOMContentLoaded', syncTarget);

  // In-drawer quantity changes/removals: the theme rebuilds the drawer and
  // writes the new percent into the fresh <progress> — glide bar and truck
  // from the previous value to the new one (setTimeout lets the theme's
  // synchronous rebuild finish first).
  document.addEventListener('theme:cart:change', function () {
    setTimeout(function () {
      if (raf !== null) return;
      var parts = getParts();
      if (!parts) return;
      var target = Math.max(0, Math.min(100, parseFloat(parts.bar.value) || 0));
      parts.bar.dataset.truckTarget = target;
      var from = lastValue === null ? target : lastValue;
      if (Math.abs(target - from) < 0.5) {
        paint(parts, target);
        return;
      }
      pulseAmount(parts);
      animateTo(parts, target, from, 500);
    }, 0);
  });
})();
