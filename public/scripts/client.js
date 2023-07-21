$(document).ready(function() {
  // hidden elements on load
  $(".new-tweet").hide();
  $(".error").hide();

  // input even handling for counter on composer
  $(".new-tweet").on("input", () => {
    const counter = $(this).find(".counter");
    const textareaElm = $(this).find("textarea#tweet-text");
    composerCounter(counter, textareaElm);
  });

  // "TWEET" button event handling
  $(".new-tweet").on("submit", function(event) {
    event.preventDefault();

    const textareaElm = $(this).find("textarea#tweet-text");
    const tweetVal = textareaElm.val();
    const tweetLength = tweetVal.length;

    // making sure error element is hidden if it was previously visible
    $(".error").empty().hide();
    $(".new-tweet").css("height", "150px");

    // validate form submission
    const isValid = formValidator(tweetLength, tweetVal);
    if (!isValid) {
      return;
    }

    const formData = $(textareaElm).serialize();

    postTweet(formData, textareaElm);
  });

  // "Write a new tweet" event handling
  $("#tweet-toggle").on("click", function(event) {
    event.preventDefault();
    toggleNewTweet();
  });

  // check y axis of document and decide to show scroll up button or not
  $("#tweets-container").on("scroll", checkScrollPosition);

  // when scroll up is clicked, the page will scroll to the top
  $("#scroll-to-top").on("click", scrollToTop);

  // load existing tweets on first page load
  loadTweets();
});
