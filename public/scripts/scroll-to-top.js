/**
 * This function checks the Y position of tweet-containers scroll bar and decides
 * wether or not to show the scroll to top button
 */
const checkScrollPosition = function() {
  if ($("#tweets-container").scrollTop() > 10) {
    $("#scroll-to-top").show();
  } else {
    $("#scroll-to-top").hide();
  }
};

/**
 * this function animates the scrolling of the tweets container to the top of its section
 */
const scrollToTop = function() {
  $("#tweets-container").animate({ scrollTop: 0 }, "slow");
};

