const body = document.querySelector('body');

// Animated Video Cards
let vidCardsContainer = document.querySelector(".rdc-scroll-vid-vids")
let vidCardsWidth = 1800;
let animSize;

if(vidCardsContainer) {
const translateLeftSize = function () {
  if(window.innerWidth > 500) {
  animSize = ((vidCardsWidth-window.innerWidth) + 380) * -1;
} else {
   animSize = ((vidCardsWidth-window.innerWidth) + 320) * -1;
}
}

const translateRightSize = function () {
  if(window.innerWidth > 500) {
   animSize = 100;
} else {
   animSize = 60;
}
}

translateLeftSize()

window.addEventListener('resize', (event) => {
translateLeftSize()
})

const animateVidCardsPause = function () {
   clearTimeout(animateVidCardsTimeout)
  setTimeout(animateVidCards, 0)
    vidCardsContainer.style.transition = `all 50s ease-in-out`

vidCardsContainer.addEventListener('mouseleave', function () {

   if(window.innerWidth > 767) {
  vidCardsContainer.style.transition = `all 8s ease-in-out`
   } else {
     vidCardsContainer.style.transition = `all 16s ease-in-out`
   }
  
   clearTimeout(animateVidCardsTimeout)
  animateVidCards()

})
}

let animateVidCardsTimeout;
const animateVidCards = function () {
  if(animSize < 0 ) {
      vidCardsContainer.style.transform = `translateX(${animSize}px)`
    translateRightSize()
  } else {
    vidCardsContainer.style.transform = `translateX(${animSize}px)`
   translateLeftSize()
  }
  if(window.innerWidth > 767) {
    animateVidCardsTimeout = setTimeout(animateVidCards, 8000);
  } else {
     animateVidCardsTimeout = setTimeout(animateVidCards, 16000);
  }

  
}
animateVidCards()

vidCardsContainer.addEventListener('mouseenter',animateVidCardsPause)
vidCardsContainer.addEventListener('click',animateVidCardsPause)
vidCardsContainer.addEventListener('touchStart',animateVidCardsPause)
}
// Animated Video Cards ----END


const videoCards = document.querySelectorAll('.rdc-scroll-vid-card');
const videoModals = document.querySelectorAll('.rdc-scroll-vid-modal');
const vidModalsContainer = document.querySelector('.rdc-scroll-vid-modals');
const vidModalsCloseBg = document.querySelector('.rdc-scroll-vid-close-bg');
const vidModalsCloseBtns = document.querySelectorAll('.rdc-scroll-vid-close-btn');
const vidsSlider = document.querySelector('.rdc-scroll-vid-vids');


if(vidModalsContainer) {
const openModal =  function () {
  const cardIndex = Array.from(videoCards).indexOf(this);
  const videoModal = document.querySelector(`.rdc-scroll-vid-modal-${cardIndex}`);

  vidModalsContainer.classList.remove('rdc-d-none');
  videoModals.forEach(vidmodal => {vidmodal.classList.add('rdc-d-none');})
   videoModal.classList.remove('rdc-d-none');
vidsSlider.classList.add('rdc-pause-anim');
}

const closeModal =  function () {
  videoModals.forEach(vidmodal => {vidmodal.classList.add('rdc-d-none');})
   vidModalsContainer.classList.add('rdc-d-none');
vidsSlider.classList.remove('rdc-pause-anim');
animateVidCards()
}

for(let i=0; i<videoCards.length; i++) {
videoCards[i].addEventListener('click', openModal)
}
vidModalsCloseBg.addEventListener('click', closeModal)

vidModalsCloseBtns.forEach(vidModalsCloseBtn => {
  vidModalsCloseBtn.addEventListener('click', closeModal)
})
}

if(body.classList.contains('template-product')) {
const variantPickers = document.querySelectorAll('.rdc-variant-picker');
const variantSelect = document.querySelector('.single-option-selector');
const variantDescs = document.querySelectorAll('.rdc-variant-desc');
const variantLongDescs = document.querySelectorAll('.rdc-variant-long-desc');
const variantHows = document.querySelectorAll('.rdc-variant-how');
const variantIngredients = document.querySelectorAll('.rdc-variant-how');
const variantPrices = document.querySelectorAll('.rdc-variant-price');


const showVariantDesc = function () {
  setTimeout(function() {
  var url = new URL(location.href);

  let variantId = url.searchParams.get('variant');;
  // variantId = variantId.split('?');
  // variantId = variantId[1].split('=');
  // variantId = variantId[1];
    const variantDescClass = `rdc-variant-desc-${variantId}`
    const variantLongDescClass = `rdc-variant-long-desc-${variantId}`
    const variantHowClass = `rdc-variant-how-${variantId}`
    const variantIngredientClass = `rdc-ingredient-${variantId}`
    const variantPriceClass = `rdc-variant-price-${variantId}`

variantDescs.forEach(variantDesc => {variantDesc.classList.add('rdc-d-none')})
variantLongDescs.forEach(variantLongDesc => {variantLongDesc.classList.add('rdc-d-none')})
variantHows.forEach(variantHow => {variantHow.classList.add('rdc-d-none')})
variantIngredients.forEach(variantIngredient => {variantIngredient.classList.add('rdc-d-none')})
variantPrices.forEach(variantPrice => {variantPrice.classList.add('rdc-d-none')})

    
for(let i=0; i<variantDescs.length; i++) {
    
  if(variantDescs[i].classList.contains(variantDescClass)) {
    variantDescs[i].classList.remove('rdc-d-none')
  }
  if(variantLongDescs[i].classList.contains(variantLongDescClass)) {
    variantLongDescs[i].classList.remove('rdc-d-none')
  }
    if(variantHows[i].classList.contains(variantHowClass)) {
    variantHows[i].classList.remove('rdc-d-none')
  }
      if(variantIngredients[i].classList.contains(variantIngredientClass)) {
    variantIngredients[i].classList.remove('rdc-d-none')
  }
  if(variantPrices[i].classList.contains(variantPriceClass)) {
    variantPrices[i].classList.remove('rdc-d-none')
  }
}

//for price
for(let i=0; i<variantPrices.length; i++) {
  if(variantPrices[i].classList.contains(variantPriceClass)) {
    variantPrices[i].classList.remove('rdc-d-none')
  }
}

// Also update media viewer

    const pmMediaMains = document.querySelectorAll(".rdc-product-media-main")

    pmMediaMains.forEach(pmMediaMain => {
      pmMediaMain.classList.add("rdc-d-none")
      pmMediaMain.classList.remove("rdc-active")
     if(variantId == pmMediaMain.getAttribute("data-id")) {
      pmMediaMain.classList.remove("rdc-d-none")
      pmMediaMain.classList.add("rdc-active")
    }
    })


  console.log(variantId);
  //to handle scrolling
  const resizeEvent = new Event('resize');
  window.dispatchEvent(resizeEvent);
    }, 200);
}
 if(variantSelect) {
   variantSelect.addEventListener('change', showVariantDesc);
 }


variantPickers.forEach(variantPicker => {
  variantPicker.addEventListener('click', showVariantDesc);
})


}

// Animated Feedback
const logos = document.querySelectorAll('.feedback-scroll-logo img')
const contents = document.querySelectorAll('.feedback-scroll-content-inner');
const feedbackBox = document.querySelector('.feedback-scroll-text');

// Auto
if(feedbackBox) {
const switchFeedbackAuto = function () {
const activeLogo = document.querySelector('.rdc-active-logo')
const activeLogoIndex = Array.from(logos).indexOf(activeLogo); 
  
const activeContent = activeLogoIndex < logos.length-1 ? 
  document.querySelector(`.feedback-scroll-content-${activeLogoIndex + 1}`) :
  document.querySelector(`.feedback-scroll-content-0`)
  
const newActiveLogo = activeLogoIndex < logos.length-1 ? logos[activeLogoIndex + 1] : logos[0]
  Array.from(contents).forEach(content => {
    content.classList.add('rdc-d-none')
    content.classList.remove('rdc-active')
  })
  Array.from(logos).forEach(logo => {logo.classList.remove('rdc-active-logo')})
  activeContent.classList.remove('rdc-d-none')
  activeContent.classList.add('rdc-active')
  newActiveLogo.classList.add('rdc-active-logo')
  
}

let switchFeedbackInterval = setInterval (switchFeedbackAuto, 4000)

// On click
const switchFeedback = function () {
clearInterval(switchFeedbackInterval)
const thisIndex = Array.from(logos).indexOf(this);
const activeContent = document.querySelector(`.feedback-scroll-content-${thisIndex}`)

  
  Array.from(contents).forEach(content => {
    content.classList.add('rdc-d-none')
    content.classList.remove('rdc-active')
  })
  Array.from(logos).forEach(logo => {logo.classList.remove('rdc-active-logo')})
      activeContent.classList.remove('rdc-d-none')
  activeContent.classList.add('rdc-active')
  this.classList.add('rdc-active-logo')
}

Array.from(logos).forEach(logo => {
  logo.addEventListener('click', switchFeedback)
})

feedbackBox.addEventListener('mouseleave', function () {

  clearInterval(switchFeedbackInterval)
  switchFeedbackInterval = setInterval (switchFeedbackAuto, 4000)
})
}
// Animated Feedback END


// Sliding columns
let slideColsContainer = document.querySelector('.sliding-columns-container')
const slideBtns = document.querySelectorAll('.sliding-col-btn-outer')
const slideColsOuter = document.querySelector('.sliding-columns-outer')

let slideBoxes = document.querySelectorAll('.sliding-columns-box');
let colWidth, centerTranslateSize;

if(slideColsContainer) {
const colAdjust = function () {
  colWidth = window.innerWidth > 767 ? window.innerWidth * .4 : window.innerWidth * .96;
  if(window.innerWidth > 767) {
    centerTranslateSize = colWidth * .268;
  } else if (window.innerWidth <= 600 && window.innerWidth > 450) {
    centerTranslateSize = colWidth;
  } else if (window.innerWidth <= 450) {
    centerTranslateSize = colWidth * .98;
  } else {
    centerTranslateSize = colWidth * .993;
  }
  
}
colAdjust();

const slideBox0 = slideBoxes[0].cloneNode(true);
const slideBoxLast = slideBoxes[slideBoxes.length-1].cloneNode(true);


slideColsContainer.prepend(slideBoxLast)
slideColsContainer.append(slideBox0)
slideBoxes = document.querySelectorAll('.sliding-columns-box');

slideBoxes.forEach(slideBox => {
  slideBox.style.width = `${colWidth}px`
})

slideBoxes[1].classList.add('rdc-active-col')
slideColsContainer.style.transform = `translateX(-${centerTranslateSize}px)`


window.addEventListener('resize', (event) => {
 colAdjust();
slideBoxes.forEach(slideBox => {
  slideBox.style.width = `${colWidth}px`

})
  slideColsContainer.style.transform = `translateX(-${centerTranslateSize}px)`
});
  let translateSize = 0;
let count = 1;
const slideColumns = function () {


    slideBoxes[count].classList.remove('rdc-active-col')
    
    
  const isPrev = this.id == 'sliding-col-prev';
 
      if (isPrev) {
    count--;
    translateSize += colWidth;
    slideColsContainer.style.transform = `translateX(${translateSize - centerTranslateSize}px)`
        slideBtns[1].classList.remove('rdc-d-none') 
         if(count == 1) {
    this.classList.add('rdc-d-none') 
  }    
  } else {
    count++;
    translateSize -= colWidth;
    slideColsContainer.style.transform = `translateX(${translateSize - centerTranslateSize}px)`
        slideBtns[0].classList.remove('rdc-d-none') 
       if(count == Array.from(slideBoxes).length-2) {
    this.classList.add('rdc-d-none') 
  }    
  }
      slideBoxes[count].classList.add('rdc-active-col')

}

slideBtns.forEach(slideBtn => {
  slideBtn.addEventListener('click', slideColumns);
})
}

// Complementary Products
const cpBtns = document.querySelectorAll(".rdc-cp-navs span");
const cpBoxes = document.querySelectorAll(".rdc-cp-box")
const cpSlider = document.querySelector(".rdc-cp-inner")

let cpBoxWidth;
let cpBoxSlideSize = 0;
let btnClick = 0;

cpBoxes.forEach(cpBox => {
  cpBoxWidth = cpBox.clientWidth
})

const swipeCPBox = function () {
  const isPrev = this.classList.contains('rdc-cp-nav-prev')

  if(isPrev) {
      cpBoxSlideSize += cpBoxWidth
      btnClick--
  } else {
      cpBoxSlideSize -= cpBoxWidth
      btnClick++
  }

  if (btnClick > 0) {
    cpBtns[0].classList.remove("rdc-d-none")
  } else {
    cpBtns[0].classList.add("rdc-d-none")
  }

  if (btnClick == cpBtns.length) {
    cpBtns[1].classList.add("rdc-d-none")
  } else {
    cpBtns[1].classList.remove("rdc-d-none")
  }
  
  cpSlider.style.transform = `translateX(${cpBoxSlideSize}px)`
}

cpBtns.forEach(cpBtn => {
  cpBtn.addEventListener('click', swipeCPBox)
})

// const prodMediaDots = document.querySelectorAll(".rdc-media-dot")
// const prodImages = document.querySelectorAll(".feature-media-item")
// const prodImageList = document.querySelector(".feature-media-list")
// const prodImageThumbs = document.querySelectorAll("li.product-thumbnail-list-item")

// const changeActiveDot = function () {
//  setTimeout(function () {
//   const activeProdImg = document.querySelector(".is-visible")

//      prodMediaDots.forEach(prodMediaDot => {
//     prodMediaDot.classList.remove("rdc-active")
//   })
// for (let i=0; i<Array.from(prodMediaDots).length; i++) {

//   if(Array.from(prodImages).indexOf(activeProdImg) == i) {
//     prodMediaDots[i].classList.add("rdc-active")
//   }
// }

// }, 500)
// }

// prodImageList.addEventListener('touchmove', changeActiveDot);
// prodImageThumbs.forEach(prodImageThumb => {
//     prodImageThumb.addEventListener('click', function () {
      
//       prodImages.forEach(prodImage => {
//     prodImage.classList.remove("is-visible");
//     if (Array.from(prodImageThumbs).indexOf(this) == Array.from(prodImages).indexOf(prodImage)) {
//       prodImage.classList.add("is-visible");
//     }

//   })
//       changeActiveDot()
//     });
// })

// const pmImageDisplayed = document.querySelector(".rdc-product-media-viewer img")
const pmThumbnails = document.querySelectorAll(".rdc-pm-thumbnail")

// pmThumbnails.forEach(pmThumbnail => {
//  console.log(pmThumbnail)
// })

const changePMDisplay = function () {
  let thisImageSrc = this.children[0].src;
//   thisImageSrc = thisImageSrc.split("_")
// thisImageSrc[thisImageSrc.length-1] = "1000x"
// thisImageSrc = thisImageSrc.join("_")

let pmImageDisplayed = this.closest('.rdc-product-media-main').querySelector('.rdc-product-media-viewer').children[0]
  pmImageDisplayed.src=`${thisImageSrc}`
  this.closest('.rdc-product-media-thumbnails').querySelectorAll('.rdc-pm-thumbnail').forEach(pmThumbnail => {
    pmThumbnail.classList.remove('current-thumb')
  })
  this.classList.add('current-thumb')
}


pmThumbnails.forEach(pmThumbnail => {
  pmThumbnail.addEventListener("click", changePMDisplay)
})




const imageViewers = document.querySelectorAll(".rdc-product-media-viewer")
let touchstartX = 0
let touchendX = 0


imageViewers.forEach(imageViewer => {
 imageViewer.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

imageViewer.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})

})

    
function checkDirection() {
  const pmDots = document.querySelectorAll(".rdc-product-media-main.rdc-active span.rdc-pm-dot")
  const pmDotActive = document.querySelector(".rdc-product-media-main.rdc-active span.rdc-pm-dot.rdc-active")

  let pmDotActiveIndex = Array.from(pmDots).indexOf(pmDotActive);
 

  console.log(pmDotActiveIndex)

 if (touchendX < touchstartX) {
   if (pmDotActiveIndex < pmDots.length-1) {
    pmDotActiveIndex++;
   }
  }
  if (touchendX > touchstartX) {
    if(pmDotActiveIndex > 0) {
    pmDotActiveIndex--
    }
  }
  
  pmDots.forEach(pmDot => {
    pmDot.classList.remove("rdc-active")
  })
  pmDots[pmDotActiveIndex].classList.add("rdc-active")
 
const pmThumbnailsActive = document.querySelectorAll(".rdc-product-media-main.rdc-active .rdc-pm-thumbnail")  
let imageSrc = pmThumbnailsActive[pmDotActiveIndex].children[0].src;
//   imageSrc = imageSrc.split("_")
// imageSrc[imageSrc.length-1] = "1000x"
// imageSrc = imageSrc.join("_")

let pmImageDisplayed = document.querySelector(".rdc-product-media-main.rdc-active").children[0].children[0].children[0]
  pmImageDisplayed.querySelector('img').src=`${imageSrc}`

}

// variant picker arrow

const variantPickerCon = document.querySelector("fieldset.product-variant-picker-block")
const variantPickerMain = document.querySelector(".product-block-variant-picker")
const variantPickerMore = document.querySelector(".rdc-vp-more")


// if(variantPickerCon) {
// if(variantPickerMain.clientWidth < variantPickerCon.clientWidth) {
//   variantPickerCon.style.paddingRight = '50px'
//   variantPickerMore.style.display = 'flex'
// }
// }


// Animated Feedback
// const logosContainer = document.querySelector('.feedback-scroll-logo');
// let logos = document.querySelectorAll('.feedback-scroll-logo img');
// let contents = document.querySelectorAll('.feedback-scroll-content-inner');
// const logosOuter = document.querySelector('.feedback-scroll-logo-outer');
// const contentContainer = document.querySelector('.feedback-scroll-content');
// const contentContainerOuter = document.querySelector('.feedback-scroll-content-outer');

// let translateXSize, contentTranslateXSize, threeLogosWidth, currentContentWidth, logoIndex, currentLogoWidth, activeLogo;

//   const feedbackInit = function () {
//     activeLogo = document.querySelector('.rdc-active-logo');
// let activeLogoIndex = Array.from(logos).indexOf(activeLogo);
    
//      translateXSize = 0;
//  contentTranslateXSize = 0;


// if (window.innerWidth > 989) {
//  threeLogosWidth = logos[0].clientWidth + logos[1].clientWidth + logos[2].clientWidth + 180;
// } else {
//   threeLogosWidth = logos[activeLogoIndex].clientWidth + 60;
// }
  
// logosOuter.style.width = `${threeLogosWidth}px`

//  currentContentWidth = contents[0].clientWidth + 10;
// contentContainerOuter.style.width = `${currentContentWidth}px`
//  logoIndex = 0;
//  currentLogoWidth = 0;
//   }


// feedbackInit()

// let feedbackMain = document.querySelector('.feedback-scroll-text');

// const feedbackAuto = function () {

//     if(logoIndex<Array.from(logos).length-1) {  
//       logos[logoIndex+1].classList.add('rdc-active-logo')
//       logos[logoIndex].classList.remove('rdc-active-logo'); 

//       if(logoIndex == 0) {
//         currentLogoWidth = logos[0].clientWidth + 60;
//         currentContentWidth = contents[0].clientWidth + 10;
//       } else {
//         currentLogoWidth += logos[logoIndex].clientWidth + 60;
//         currentContentWidth += contents[logoIndex].clientWidth + 10;
//       }

//    logosContainer.style.transform = `translateX(-${currentLogoWidth}px)`
//    contentContainer.style.transform = `translateX(-${currentContentWidth}px)`  

//          logoIndex++

//       if (window.innerWidth > 989) {
//  if (logoIndex==logos.length-2) {
//         threeLogosWidth = logos[logoIndex].clientWidth + logos[logoIndex+1].clientWidth + 120;
//       } else if(logoIndex==logos.length-1) {
//         threeLogosWidth = logos[logoIndex].clientWidth + 60;
//       } else {
//          threeLogosWidth = logos[logoIndex].clientWidth + logos[logoIndex+1].clientWidth + logos[logoIndex+2].clientWidth + 180;
//       }
        
//       } else {
 
//         threeLogosWidth = logos[logoIndex].clientWidth + 60;
//       }
     
//   logosOuter.style.width = `${threeLogosWidth}px` 
//     } else {
//      logosContainer.style.transform = `translateX(0)`
//       contentContainer.style.transform = `translateX(0)`
//       logos[0].classList.add('rdc-active-logo')
//       logos[logoIndex].classList.remove('rdc-active-logo'); 
//       logoIndex = 0;
//       if (window.innerWidth > 989) {
//       threeLogosWidth = logos[0].clientWidth + logos[1].clientWidth + logos[2].clientWidth + 180;
//       } else {
//       threeLogosWidth = logos[0].clientWidth + 60;
//       }

//       logosOuter.style.width = `${threeLogosWidth}px`
//       currentLogoWidth = logos[0].clientWidth + 60;
//       currentContentWidth = contents[0].clientWidth + 10;
//     }
// }
//  let feedbackInterval = setInterval(feedbackAuto, 5000)

// // Onclick
// const changeActive = function () {
//   clearInterval(feedbackInterval)
//   let thisIndex = Array.from(logos).indexOf(this);

//     this.classList.add('rdc-active-logo');
//    logos[thisIndex-1].classList.remove('rdc-active-logo'); 

//         for(let i=0; i<thisIndex; i++) { 
//       translateXSize += logos[i].clientWidth + 60;
//      contentTranslateXSize += contents[i].clientWidth + 10;    
//   }

// logosContainer.style.transform = `translateX(-${translateXSize}px)`;  
// contentContainer.style.transform = `translateX(-${contentTranslateXSize}px)`;
//   translateXSize = 0;
//   contentTranslateXSize = 0;

// threeLogosWidth = logos[thisIndex].clientWidth + logos[thisIndex+1].clientWidth + logos[thisIndex+2].clientWidth + 180;
//   logosOuter.style.width = `${threeLogosWidth}px`
// currentContentWidth = contents[thisIndex].clientWidth + 10;
// contentContainerOuter.style.width = `${currentContentWidth}px`  
// }


// let feedbackInterval2;
// feedbackMain.addEventListener('mouseleave', function() {
//   feedbackInit()
 
//   setTimeout(function () {
//       logosContainer.style.transform = `translateX(0)`
//       contentContainer.style.transform = `translateX(0)`
//         Array.from(logos).forEach(logo => {
//         logo.classList.remove('rdc-active-logo'); 
//     })
//           logos[0].classList.add('rdc-active-logo')
//         activeLogo = document.querySelector('.rdc-active-logo');
//     if(window.innerWidth < 990) {
//       logosOuter.style.width = `${logos[0].clientWidth + 60}px`
//     }

  
//   }, 2000)
  
  
//  let feedbackInterval2 = setInterval(feedbackAuto, 5000)
//   feedbackMain.addEventListener('mouseenter', function() {
//       clearInterval(feedbackInterval2)
//   })
// })

// feedbackMain.addEventListener('mouseenter', function() {
//    clearInterval(feedbackInterval)
// })

// logos.forEach(logo => {
//   logo.addEventListener('click', changeActive)
// })


// Checkout Checkbox
const cartIcon = document.querySelector('.rdc-cart-icon')
const atcBtn = document.querySelector('.rdc-atc-btn')

let cartCheckoutBtn = document.querySelector('.rdc-brite-co-btn')
let cartAgreement = document.querySelector('input.br-agreement-co-cb')

const updateCheckoutBtn = function () {

setTimeout(function () {
const cartBtns = document.querySelectorAll('.rdc-other-cb')
  
  cartCheckoutBtn = document.querySelector('.rdc-brite-co-btn')
cartAgreement = document.querySelector('input.br-agreement-co-cb')
  cartAgreement.checked = false;
  cartAgreement.classList.remove('rdc-active')
   cartCheckoutBtn.removeAttribute('type')
  cartCheckoutBtn.parentElement.classList.add('rdc-disabled')

cartBtns.forEach(cartBtn => {
  cartBtn.addEventListener('click', function () {
    cartAgreement.checked = false;
    this.classList.remove('rdc-active')
  })
})
  
cartAgreement.addEventListener('click', function (e) {

   if(!this.classList.contains('rdc-active') && this.checked) {
     console.log('rdc-active')
     this.classList.add('rdc-active')
  cartCheckoutBtn.setAttribute('type', 'submit')
  cartCheckoutBtn.parentElement.classList.remove('rdc-disabled')
  } else if (this.classList.contains('rdc-active') && !this.checked) {
     console.log('rdc-inactive')
   this.classList.remove('rdc-active')
  cartCheckoutBtn.removeAttribute('type')
  cartCheckoutBtn.parentElement.classList.add('rdc-disabled')
  }

})
},1000)
}

cartIcon.parentElement.addEventListener('click', updateCheckoutBtn)
atcBtn.parentElement.addEventListener('click', updateCheckoutBtn)




