const toggleNewTweet = function() {
  if ($(".new-tweet").is(":hidden")) {
    $(".new-tweet").slideDown();
  } else {
    $(".new-tweet").slideUp();
  }
}
