class ScrollContainer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const container = this.querySelector('.content_icon_container');
      const leftButton = this.querySelector('.left-button');
      const rightButton = this.querySelector('.right-button');
        
      const updateButtonVisibility = () => {
        // Show/hide the left button based on scroll position
        if (container.scrollLeft > 0) {
          leftButton.style.visibility = 'visible';
        } else {
          leftButton.style.visibility = 'hidden';
        }
        console.log(container.scrollLeft,container.scrollWidth,container.clientWidth)
        // Show/hide the right button based on scroll position
        if (container.scrollLeft < container.scrollWidth - container.clientWidth) {
          rightButton.style.visibility = 'visible';
        } else {
          rightButton.style.visibility = 'hidden';
        }
      };
  
      const scrollHandler = () => {
        updateButtonVisibility();
      };
  
      const resizeHandler = () => {
        updateButtonVisibility();
      };
  
      leftButton.addEventListener('click', () => {
        container.scrollLeft -= 300; // Adjust the scrolling speed as needed
      });
  
      rightButton.addEventListener('click', () => {
        container.scrollLeft += 300; // Adjust the scrolling speed as needed
      });
  
      container.addEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);
      
      updateButtonVisibility(); // Trigger initial visibility check
    }
  }
  
  customElements.define('icon-links-slider', ScrollContainer);