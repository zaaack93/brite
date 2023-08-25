window['ThemeSection_Product'] = ({
  product,
  variant,
  featuredMediaID,
  template,
  thumbnailsPosition,
}) => {
  return {
    productRoot: null,
    product: product,
    current_variant: variant,
    featured_media_id: featuredMediaID,
    current_media_id: featuredMediaID,
    loading: false,
    quantity: '1',
    options: [],
    optionHandles: [],
    storeAvailability: null,
    addedToCart: false,
    stickyAddToCartShown: false,
    template: template,
    thumbnailsPosition: thumbnailsPosition,
    get addToCartText() {
      if (this.current_variant) {
        if (this.loading) {
          return window.theme.strings.loading;
        }
        if (!this.loading && this.current_variant.available) {
          if (this.template === 'product.preorder') {
            return window.theme.strings.preOrder;
          } else {
            return window.theme.strings.addToCart;
          }
        }
        if (!this.loading && !this.current_variant.available) {
          return window.theme.strings.soldOut;
        }
      } else {
        return window.theme.strings.unavailable;
      }
    },
    get currentVariantId() {
      if (this.current_variant) {
        return this.current_variant.id;
      } else {
        return null;
      }
    },
    get currentVariantAvailabilityClosestLocation() {
      // this is on a lag to the actual current variant so that we can display an intermediary state while the fetch request is happening
      if (!Alpine.store('availability')) return null;

      const id = this.currentVariantId;
      const storeData = Alpine.store('availability').availability[id];
      if (storeData) {
        return storeData.closest_location;
      } else {
        return null;
      }
    },
    get currentVariantAvailable() {
      if (this.current_variant) {
        return this.current_variant.available;
      } else {
        return null;
      }
    },
    get currentVariantTitle() {
      if (this.current_variant && this.current_variant.title) {
        if (!this.current_variant.title.includes('Default')) {
          return this.current_variant.title;
        }
      }
      return '';
    },
    get current_price() {
      return this.current_variant.price;
    },
    get isUsingSlideshowToDisplayMedia() {
      const splideEl = this.productRoot.querySelector('.splide--product');

      if (window.Splide && this.productRoot && splideEl) {
        if (
          window.slideshows &&
          window.slideshows[`${splideEl.id}`] &&
          !window.slideshows[`${splideEl.id}`].state.is(
            window.Splide.STATES.DESTROYED
          )
        ) {
          return true;
        }
      }

      return false;
    },
    formatMoney(price) {
      return formatMoney(price, theme.moneyFormat);
    },
    init() {
      // Set a product root for nested components
      // to use instead of $root (which refers to their root)
      this.productRoot = this.$root;

      if (this.$refs.productForm) {
        this.$refs.productForm.addEventListener(
          'submit',
          this.submitForm.bind(this)
        );
      }

      this.getOptions();
      this.getAddToCartButtonHeight();

      this.$watch('current_media_id', (value, oldValue) => {
        if (this.isUsingSlideshowToDisplayMedia) return;
        if(this.$root.querySelector(`[data-product-single-media-wrapper="${oldValue}"]`))
          this.$root
            .querySelector(`[data-product-single-media-wrapper="${oldValue}"]`)
            .dispatchEvent(new CustomEvent('mediaHidden'));

        if(this.$root.querySelector(`[data-product-single-media-wrapper="${value}"]`))
        this.$root
          .querySelector(`[data-product-single-media-wrapper="${value}"]`)
          .dispatchEvent(new CustomEvent('mediaVisible'));
      });

      this.updateStoreAvailability(this.current_variant);
      setTimeout(() => {
        // Get all div elements with the class 'variant-input'
        const variantDivs = document.querySelectorAll('.variant-input');

        // Iterate through the div elements
        variantDivs.forEach(div => {
          // Find the radio input inside the current div
          const radioInput = div.querySelector('input[type="radio"]');

          // Check if the radio input is checked
          if (radioInput && radioInput.checked) {
            // Create a new 'change' event
            const changeEvent = new Event('change', {
              bubbles: true
            });

            // Dispatch the 'change' event on the radio input
            radioInput.dispatchEvent(changeEvent);
          }
        });
      }, 50);
      //working on scroll thumbnail
      // Get all the div elements with class "rdc-product-media-inner"
      const divElements = document.querySelectorAll('.rdc-product-media-inner');

      // Function to check screen size and perform action
      function checkScreenSize() {
        // Check if the screen width is greater than 990 pixels
        if (window.innerWidth > 990) {
          // Loop through each div element
          divElements.forEach(divElement => {
            // Check if the div element has the class "rdc-product-media-inner"
            if (divElement.classList.contains('displayleft-to-right')) {
              // Get the first div element with class "rdc-product-media-viewer"
              const firstDiv = divElement.querySelector('.rdc-product-media-viewer');

              // Get the second div element with class "rdc-product-media-thumbnails"
              const secondDiv = divElement.querySelector('.rdc-product-media-thumbnails');

              // Set the height of the second div equal to the height of the first div
              secondDiv.style.height = `${firstDiv.offsetHeight+45}px`;

              secondDiv.addEventListener('scroll', function() {
                if (secondDiv.scrollTop + secondDiv.clientHeight + 40 >= secondDiv.scrollHeight) {
                  // Perform your action here when scrolling to the bottom
                  divElement.querySelector('.thumbnails-overflow-indicator-bottom').style.opacity=0
                  // You can replace the console.log statement with your desired action
                }
                else{
                  divElement.querySelector('.thumbnails-overflow-indicator-bottom').style.opacity=1
                }
              });
            }
          });
        }
      }

// Call the function initially
checkScreenSize();

// Add an event listener to check screen size on window resize
window.addEventListener('resize', checkScreenSize);
    },
    getAddToCartButtonHeight() {
      window.onload = function () {
        const height = document.querySelector('.add-to-cart-btn').offsetHeight;
        document.documentElement.style.setProperty(
          '--payment-button-height',
          `${height}px`
        );
      };
    },
    updateStoreAvailability(variant) {
      if (!this.$refs.storeAvailabilityContainer) return;
      this.storeAvailability =
        this.storeAvailability ||
        new StoreAvailability(this.$refs.storeAvailabilityContainer);

      if (this.storeAvailability && variant) {
        this.storeAvailability.fetchContent(variant);
      }
    },
    
    changeMediaOp(ope) {
      const thumbContainer = this.$root.querySelector('.rdc-product-media-main.rdc-active .container--thumbnail .rdc-product-media-thumbnails')
      if(thumbContainer){
        const ActivateContainer = thumbContainer.querySelector('.rdc-pm-thumbnail.current-thumb')
        const thumbItems = thumbContainer.querySelectorAll('.rdc-pm-thumbnail')

        if(!ActivateContainer)
          thumbContainer.querySelector('.rdc-pm-thumbnail').classList.add('current-thumb')


        const index = Array.from(thumbItems).indexOf(ActivateContainer);
        if(ope=='next'){
          if(thumbItems.length>index+1){
            thumbItems[index+1].click()
            thumbContainer.scrollTop = thumbItems[index+1].offsetTop;

          }
        }
        else if(ope=='prev'){
          if(index>0){
            thumbItems[index-1].click()
            thumbContainer.scrollTop = thumbItems[index-1].offsetTop;
          }
        }

      }
    },
    optionChange(name, value) {
      
      this.getOptions();

      const matchedVariant = ShopifyProduct.getVariantFromOptionArray(
        this.product,
        this.options
      );
      this.current_variant = matchedVariant;

      if (this.current_variant) {
        variantLiveRegion(this.current_variant);
        this.updateStoreAvailability(this.current_variant);

        if (this.current_variant.featured_media) {
          this.current_media_id = this.current_variant.featured_media.id;
        }
        const url = ShopifyProductForm.getUrlWithVariant(
          window.location.href,
          this.current_variant.id
        );

        window.history.replaceState({
          path: url
        }, '', url);

        this.$refs.singleVariantSelector.dispatchEvent(
          new Event('change', {
            bubbles: true
          })
        );
        this.$root.dispatchEvent(
          new CustomEvent('shapes:product:variantchange', {
            bubbles: true,
            detail: {
              variant: this.current_variant
            },
          })
        );


        //update price
        if (document.querySelector('.currentPrice .money')) {
          document.querySelector('.currentPrice .money').innerHTML = formatMoney(this.current_variant.price)
        }
        //filter options
        const productFilterdWithOption = this.product.variants.filter((variant) => variant.options.includes(value))

        // Get all div elements with the class 'variant-input'
        const variantDivs = document.querySelectorAll('.variant-input');

        // Define the value you want to filter out
        const excludedValue = name;

        // Filter the div elements based on the data-option-name attribute
        const filteredDivs = Array.from(variantDivs).filter(div => {
          const optionName = div.getAttribute('data-option-name');
          return optionName !== excludedValue;
        });

        filteredDivs.filter(div => {
          const optionValue = div.getAttribute('data-option-value');
          const existValue = productFilterdWithOption.filter(product => {
            return product.options.includes(optionValue) && product.options.includes(value);
          });
          if (existValue.length != 0) {
            div.classList.remove('hide')
          } else {
            div.classList.add('hide')
          }
        });
      }
    },
    getOptions() {
      this.options = [];
      this.optionHandles = [];

      let selectors = this.$root.querySelectorAll(
        '[data-single-option-selector]'
      );

      selectors.forEach((selector) => {
        if (selector.nodeName === 'SELECT') {
          const value = selector.value;
          this.options.push(value);
          this.optionHandles.push(
            selector.options[selector.selectedIndex].dataset.handle
          );
        } else {
          if (selector.checked) {
            console;
            const value = selector.value;
            this.options.push(value);
            this.optionHandles.push(selector.dataset.handle);
          }
        }
      });
    },
    changeMedia(direction) {
      this.$root.dispatchEvent(
        new CustomEvent('shapes:product:arrow-change', {
          bubbles: true,
          detail: {
            direction: direction
          },
        })
      );
      if (this.thumbnailsPosition == 'under') {
        const currentThumbnail = this.$root.querySelector(
          '.product-thumbnail-list-item--active'
        );
        const nextElement =
          direction == 'prev' ?
          currentThumbnail.previousElementSibling :
          currentThumbnail.nextElementSibling;
        if (nextElement !== null) {
          nextElement.querySelector('.media-thumbnail').click();
        }
      }
    },
    submitForm(evt) {
      evt.preventDefault();
      this.loading = true;

      liveRegion(window.theme.strings.loading);

      const formData = new FormData(this.$refs.productForm);

      let modalCart = theme.settings.cart_type === 'modal';

      const config = fetchConfigDefaults('javascript');

      if (modalCart) {
        formData.append('sections', 'cart-items,cart-footer,cart-item-count');
        formData.append('sections_url', window.location.pathname);
      }

      config.body = formData;

      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];
      fetch(`${theme.routes.cart_add_url}`, config)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            this.loading = false;
            throw data.description;
          }
          this.loading = false;
          this.addedToCart = true;

          if (modalCart) {
            document.body.dispatchEvent(
              new CustomEvent('shapes:modalcart:afteradditem', {
                bubbles: true,
                detail: {
                  response: data
                },
              })
            );
          }

          if (!document.querySelector('[data-show-on-add="true"]')) {
            if (this.$refs.added)
              this.$nextTick(() => this.$refs.added.focus());
          }
        })
        .catch((error) => {
          if (typeof error === 'string') {
            alert(error);
          } else {
            error.json().then((a) => {
              this.loading = false;
              alert(a.description);
            });
          }
        });
    },
    openZoom(index) {
      this.$refs.photoSwipeComponent.dispatchEvent(
        new CustomEvent('shapes:photoswipe:open', {
          detail: {
            index: index,
          },
        })
      );
    },
  };
};

window['productThumbnails'] = () => {
  return {
    firstVisible: true,
    lastVisible: false,
    mounted() {
      const firstThumbnail = this.$refs.firstThumbnail;
      const lastThumbnail = this.$refs.lastThumbnail;
      const options = {
        root: this.$root.querySelector('.splide__track'),
        rootMargin: '0px',
        threshold: 1.0,
      };
      const firstThumbnailObserver = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.firstVisible = true;
          } else {
            this.firstVisible = false;
          }
        },
        options
      );
      const lastThumbnailObserver = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.lastVisible = true;
          } else {
            this.lastVisible = false;
          }
        },
        options
      );
      firstThumbnailObserver.observe(firstThumbnail);
      lastThumbnailObserver.observe(lastThumbnail);
    },
  };
};