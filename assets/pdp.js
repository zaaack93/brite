function updateURLAndRemoveParams() {
    // Get the current URL
    let currentURL = window.location.href;
  
    // Define the query parameters you want to remove
    const paramsToRemove = ['_pos', '_sid', '_ss'];
  
    // Create a URL object to work with the URL easily
    const urlObject = new URL(currentURL);
  
    // Remove unwanted query parameters
    paramsToRemove.forEach(param => {
      urlObject.searchParams.delete(param);
    });
  
    // Get the updated URL
    const updatedURL = urlObject.href;
  
    // Update the page URL with the modified query string
    history.pushState({}, null, updatedURL);
  }
  
  // Call the function to update the URL and remove query parameters
  updateURLAndRemoveParams();