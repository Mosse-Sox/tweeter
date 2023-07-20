/**
 * This function is used to convert an untrusted into a trusted one
 * @param {string} str 
 * @returns a safe/trusted version of the users input as a string
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * This function simply constructs the tweet and then returns the jQuery object representing that tweet.
 * @param {Object} tweet 
 * @returns returns a jQuery object representing a tweet
 */
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

/**
 * This function renders tweets when called, it prepends tweets from an array onto the page
 * @param {jQuery Object} container - container to prepend the tweets to
 * @param {Array} tweets - array of tweets to render
 */
const renderTweets = function (container, tweets) {
  container.empty();
  $(".counter").html(140);
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    container.prepend($tweet);
  }

  container.find(".timeago").timeago();
};

/**
 * This function is used to load tweets onto the page using ajax and calling renderTweets
 */
const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "/tweets",
    success: (tweets) => {
      renderTweets($("#tweets-container"), tweets);
    },
  });
};

/**
 * This function is used to post tweets by making an ajax POST request to /tweets
 * @param {string} tweetText - a serialized string that contains the tweets contents
 */
const postTweet = function(tweetText) {
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: tweetText,
  }).then((response) => {
    textareaElm.val("");
    loadTweets();
  });
}

/**
 * This function is used to validate form entries
 * @param {number} tweetLength 
 * @param {string} textareaElmValue 
 * @returns true or false depending on if the tweet entry was valid or not
 */
const formValidator = function (tweetLength, textareaElmValue) {
  $(".error").empty(); // Clear any existing error messages

  if (tweetLength > 140) {
    formError(true, false);
    return false;
  } else if (!textareaElmValue) {
    formError(false, true);
    return false;
  }

  return true;
};

/**
 * @param {boolean} length - true or false depending on if a tweet is too long
 * @param {boolean} value - true or false depending on if a tweet didnt have any contents 
 * This function produces the error messages by appending them to the element with the error class
 */
const formError = function (length, value) {
  if (length) {
    return $(".error")
      .append(
        `<span><i class="fa-solid fa-triangle-exclamation"></i><strong> Tweet is too long! <strong><i class="fa-solid fa-triangle-exclamation"></i></span>`
      )
      .hide()
      .slideDown();
  }

  if (value) {
    return $(".error")
    .append(
      `<span><i class="fa-solid fa-triangle-exclamation"></i><strong> Tweet is too empty! <strong><i class="fa-solid fa-triangle-exclamation"></i></span>`
    )
    .hide()
    .slideDown();
  }
};
