/**
 * this function checks to see if the form to create a new tweet is open, if it is and its been called, it will close it
 * and if it is not, it will open it.
 */
const toggleNewTweet = function() {
  if ($(".new-tweet").is(":hidden")) {
    $(".new-tweet").slideDown();
  } else {
    $(".new-tweet").slideUp();
  }
}
