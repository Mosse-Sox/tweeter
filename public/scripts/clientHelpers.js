const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  const tweetTimeAgo = new Date(tweet.created_at).toISOString();

  const $tweet = `<article>
  <header>
    <div>
      <img src=${tweet.user.avatars}/>
      <h4>${tweet.user.name}</h4>
    </div>
    <p>${tweet.user.handle}</p>
  </header>

  <p class="tweet">${escape(tweet.content.text)}</p>

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

const formValidator = function (tweetLength, textareaElmValue) {
  $(".error").empty(); // Clear any existing error messages

  if (tweetLength > 140) {
    $(".error").append(
      `<span><i class="fa-solid fa-triangle-exclamation"></i><strong> Tweet is too long! <strong><i class="fa-solid fa-triangle-exclamation"></i></span>`
    ).hide().slideDown();
    return false;
  } else if (!textareaElmValue) {
    $(".error").append(
      `<span><i class="fa-solid fa-triangle-exclamation"></i><strong> Tweet is too empty! <strong><i class="fa-solid fa-triangle-exclamation"></i></span>`
    ).hide().slideDown();
    return false;
  }

  return true;
};
