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
  </article>`;

    return $tweet;
  };

  const renderTweets = function (container, tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      container.prepend($tweet);
    }
  };

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (tweets) => {
        console.log(tweets);
        renderTweets($("#tweets-container"), tweets);
      },
    });
  };

  $(".new-tweet").on("submit", function (event) {
    event.preventDefault();

    const textareaElm = $(this).find("textarea#tweet-text");
    const formData = $(textareaElm).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
    }).then((response) => {
      console.log(response);
    });

    loadTweets();
    $(".timeago").timeago();
  });

  loadTweets();
  $(".timeago").timeago();
});
