$(document).ready(function () {
  const createTweetElement = function (tweet) {
    const tweetTimeAgo = new Date(tweet.created_at).toISOString();

    const $tweet = `<article>
    <header>
      <div>
        <img src="https://i.imgur.com/73hZDYK.png" />
        <h4>${tweet.user.name}</h4>
      </div>
      <p>${tweet.user.handle}</p>
    </header>

    <p class="tweet">${tweet.content.text}</p>

    <hr />
    <footer>
      <p class="timeago" title="${tweetTimeAgo}">${tweet.created_at}</p>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  <br>`;

    return $tweet;
  };

  const renderTweets = function (container, tweets) {
    container.empty();
    $(".counter").html(140);
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      container.prepend($tweet);
    }

    container.find(".timeago").timeago();
  };

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (tweets) => {
        renderTweets($("#tweets-container"), tweets);
      },
    });
  };

  $(".new-tweet").on("submit", function (event) {
    event.preventDefault();

    const textareaElm = $(this).find("textarea#tweet-text");
    const tweetLength = textareaElm.val().length;

    if (tweetLength > 140) {
      $(".error").empty();
      $(".error").append(
        "<p style='color: red'><strong>Tweet is too long!<strong></p>"
      );
      return;
    }

    if (!textareaElm.val()) {
      $(".error").empty();
      $(".error").append(
        "<p style='color: red'><strong>Tweet is too empty!<strong></p>"
      );
      return;
    }

    $(".error").empty();

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

  loadTweets();
  setInterval(loadTweets(), 10000);
});
