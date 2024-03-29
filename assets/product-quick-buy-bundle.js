window['ThemeSection_ProductQuickBuy'] = ({
    product,
    variant,
    featuredMediaID,
    isGift
  }) => {
    return {
      productRoot: null,
      product: product,
      current_variant: variant,
      featured_media_id: featuredMediaID,
      current_media_id: featuredMediaID,
      loading: false,
      quantity: '1',
      current_index:0,
      options: [],
      optionHandles: [],
      addedToCart: false,
      isGift: isGift,
      get currentVariantId() {
        if (this.current_variant) {
          return this.current_variant.id;
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
      get current_price() {
        return this.current_variant.price;
      },

      previousSlide(){
        if (this.current_index > 0) {
          this.current_index--;
          this.goToFollowingVariant()
        }
      },

      nextSlide(){
        if (this.current_index != product.variants.length - 1) {
          this.current_index++;
          //this.updateVariant(this.product.variants[this.current_index])
          this.goToFollowingVariant()
        }
      },

      formatMoney(price) {
        return formatMoney(price, theme.moneyFormat);
      },

      goToFollowingVariant(){
        this.product.options.forEach((option,index)=>{
          const targetInput = this.productRoot.querySelector(`.variant-input[data-option-name="${option}"][data-option-value="${this.ordonnedVariants[this.current_index].options[index]}"]`);

          // Trigger a click event on the found input element
          if (targetInput && targetInput.querySelector('input')) {
              targetInput.querySelector('input').click();
          } else {
              console.error('Input not found');
          }
        })
      },

      sortAndGroup(arr) {
        // Sort the array first by "option2" and then by "option1"
        const sortedArray = arr.sort((a, b) => {
          if (a.option2 !== b.option2) {
            return a.option2.localeCompare(b.option2);
          }
        });

        return sortedArray;
      },
      init() {
        if(this.isGift==false){
          this.product.variants.map(variant=>{
            variant.compare_at_price= variant.price;
            variant.price= variant.price*0.8;
            return variant
          })
        }


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
        this.ordonnedVariants=this.sortAndGroup(this.product.variants)
        //for update selected price
        const matchedVariant = ShopifyProduct.getVariantFromOptionArray(
          this.product,
          this.options
        );
        this.updateVariant(matchedVariant);
      },


      addToBundle(){
        const addToSetEvent = new CustomEvent('bundle:addToSet', {
          detail: {
            variant: this.current_variant,
            isGift: this.productRoot.closest('.product-tile-bundle').getAttribute('data-is-gift'),
            handleButton: this.productRoot.querySelector('.btn-add-to-set')
            // Add more parameters as needed
          },
          bubbles: true, // Whether the event bubbles up through the DOM or not
          cancelable: true // Whether the event is cancelable or not
        });
        const product_bundler= this.productRoot.closest('product-bundler ')
        product_bundler.dispatchEvent(addToSetEvent);
      },

      mainSelectorChange() {
        const matchedVariant = ShopifyProduct.getVariantFromId(
          this.product,
          parseInt(this.$refs.singleVariantSelector.value)
        );
        this.updateVariant(matchedVariant);
      },
      optionChange(name, value) {
        this.getOptions();
        const matchedVariant = ShopifyProduct.getVariantFromOptionArray(
          this.product,
          this.options
        );
        this.updateVariant(matchedVariant);

        //
        if(matchedVariant && this.current_variant.available){
          this.productRoot.querySelector('.btn-add-to-set').removeAttribute('disabled')
        }
        else{
          this.productRoot.querySelector('.btn-add-to-set').setAttribute('disabled',true)
        }
        

      //filter options
      const productFilterdWithOption = this.product.variants.filter(
        (variant) => variant.options.includes(value)
      );

      // Get all div elements with the class 'variant-input'
      const variantDivs =  this.productRoot.querySelectorAll(".variant-input");

      // Define the value you want to filter out
      const excludedValue = name;

      // Filter the div elements based on the data-option-name attribute and uncheck all the before after options

      window.dispatchEvent(
        new CustomEvent("shapes:product:clearAllchecks", {
          bubbles: true,
        })
      );

      const filteredDivs = Array.from(variantDivs).filter((div) => {
        const optionName = div.getAttribute("data-option-name");
        const optionValue = div.getAttribute("data-option-value");

        if (
          optionName != "Color" &&
          optionName != "color" &&
          div.querySelector("input:checked")
        ) {
          window.dispatchEvent(
            new CustomEvent("shapes:product:variantavailibility", {
              bubbles: true,
              detail: {
                option: optionValue,
              },
            })
          );
        }
        return optionName !== excludedValue;
      });

      filteredDivs.filter((div) => {
        const optionValue = div.getAttribute("data-option-value");
        const existValue = productFilterdWithOption.filter((product) => {
          return (
            product.options.includes(optionValue) &&
            product.options.includes(value)
          );
        });

        if (existValue.length != 0) {
          div.classList.remove("hide");
        } else {
          div.classList.add("hide");
        }
      });
      },
      updateVariant(variant) {
        this.current_variant = variant;
        if (this.current_variant) {
          if (this.current_variant.featured_media) {
            this.current_media_id = this.current_variant.featured_media.id;
            this.current_index = this.product.variants.findIndex(item => item.id == this.current_variant.id);
          }
        }
        //update current badge
        if (this.current_variant.compare_at_price > this.current_variant.price) {
          let salePrice = formatMoney(this.current_variant.compare_at_price-this.current_variant.price, theme.moneyFormat);
          this.productRoot.querySelector('.badge-product-tile').innerHTML=`SAVE ${salePrice}`
          this.productRoot.querySelector('.badge-product-tile').style.display='initial'
        }
        else{
          this.productRoot.querySelector('.badge-product-tile').style.display='none' 
        }
      },
      getOptions() {
        this.options = [];
        this.optionHandles = [];
  
        let selectors = this.$root.querySelectorAll(
          '[data-single-option-selector-bundle]'
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
              const value = selector.value;
              this.options.push(value);
              this.optionHandles.push(selector.dataset.handle);
            }
          }
        });
      },
      submitForm(evt) {
        evt.preventDefault();
        this.loading = true;
  
        liveRegion(window.theme.strings.loading);
        const formData = new FormData(
          this.$root.querySelector('.quick-buy-product-form')
        );
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
            this.loading = false;
            this.addedToCart = true;
  
            if (modalCart) {
              document.body.dispatchEvent(
                new CustomEvent('shapes:modalcart:afteradditem', {
                  bubbles: true,
                  detail: { response: data },
                })
              );
            }
  
            if (!document.querySelector('[data-show-on-add="true"]')) {
              if (this.$refs.added)
                this.$nextTick(() => this.$refs.added.focus());
            }
          })
          .catch((error) => {
            error.json().then((a) => {
              this.loading = false;
              alert(a.description);
            });
          });
      },
    };
  };
  