//
window.addEventListener('shapes:modalcart:cartqtychange', (e) => {
    console.log(e)
    const {items} = e.detail.response
    // Initialize counters
    let giftProductCount = 0;
    let itemProductCount = 0;

    // Iterate through the array
    items.forEach(item => {
        const bundleType = item.properties["_bundle-type"];

        // Check the bundle type and increment the respective counter
        //here i removed the if (bundleType === "item-product")  statement
        if (bundleType === "gift-product") {
            giftProductCount+=item.quantity;
        } else {
            itemProductCount+=item.quantity;
        }
    });
    if(document.querySelector('.line-item-product-gift')!=null && itemProductCount<=3){
        //in this cas we need to delete the product fropm the cart
        setTimeout(()=>{
            document.querySelector('.line-item-product-gift a.rdc-other-cb').click()
        },10)
    }
    // else if (giftProductCount==0 && itemProductCount>=3){
    //     debugger
    //     //in this cas we need to add the product gift to the cart

    //     const formDataGift = new FormData();
    //     let modalCart = theme.settings.cart_type === 'modal';
    //     const configGift = fetchConfigDefaults('javascript');
  
    //     if (modalCart) {
    //       formDataGift.append('sections', 'cart-items,cart-footer,cart-item-count');
    //       formDataGift.append('sections_url', window.location.pathname);
    //     }

    //     formDataGift.append(`id`, 47155638632739);
    //     formDataGift.append(`quantity`, 1);
    //     formDataGift.append(`properties[_bundle-type]`, 'gift-product');

    //     configGift.body = formDataGift;
    //     configGift.headers['X-Requested-With'] = 'XMLHttpRequest';
    //     delete configGift.headers['Content-Type'];
        
  
    //     fetch(`${theme.routes.cart_add_url}`, configGift)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (modalCart) {
    //           document.body.dispatchEvent(
    //             new CustomEvent('shapes:modalcart:afteradditem', {
    //               bubbles: true,
    //               detail: { response: data },
    //             })
    //           );
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       }).finally(()=>{
    //         this.dataAddToBundleText.textContent=this.dataAddToBundleText.textContent.replace('LOADING','ADD TO CART')
    //       });
    // }
});