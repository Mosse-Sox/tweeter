
$(document).ready(function () {
  $(".new-tweet").hide();
  $(".error").empty().hide();

  $(".new-tweet").on("submit", function (event) {
    event.preventDefault();

    const textareaElm = $(this).find("textarea#tweet-text");
    const tweetVal = textareaElm.val();
    const tweetLength = tweetVal.length;
    
    $(".error").empty().hide();

    const isValid = formValidator(tweetLength, tweetVal);

    if (!isValid) {
      return;
    }

    const formData = $(textareaElm).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
    }).then((response) => {
      textareaElm.val("");
      loadTweets();
    });
  });

  $("#tweet-toggle").on("click", function(event) {
    event.preventDefault();
    toggleNewTweet();
  });

  loadTweets();
  setInterval(loadTweets(), 10000);
});
