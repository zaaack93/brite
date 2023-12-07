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
        if (bundleType === "gift-product") {
            giftProductCount+=item.quantity;
        } else if (bundleType === "item-product") {
            itemProductCount+=item.quantity;
        }
    });

    if(giftProductCount>0 && itemProductCount<3){
        //in this cas we need to delete the product fropm the cart
        setTimeout(()=>{
            document.querySelector('.line-item-product-gift a.rdc-other-cb').click()
        },10)
    }
});