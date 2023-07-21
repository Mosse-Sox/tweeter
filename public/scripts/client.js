$(document).ready(function () {
  // hidden elements on load
  $(".new-tweet").hide();
  $(".error").hide();


  // "TWEET" button event handling
  $(".new-tweet").on("submit", function (event) {
    event.preventDefault();

    const textareaElm = $(this).find("textarea#tweet-text");
    const tweetVal = textareaElm.val();
    const tweetLength = tweetVal.length;
    
    // making sure error element is hidden if it was previously visible 
    $(".error").empty().hide();
    $('.new-tweet').css('height', '150px');

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


  // load existing tweets on first page load
  loadTweets();
});
