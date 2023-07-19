/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  const $tweet = `<article>
  <header>
    <div>
      <img src="https://i.imgur.com/73hZDYK.png" />
      <h4>${tweetData.user.name}</h4>
    </div>
    <p>${tweetData.user.handle}</p>
  </header>

  <p class="tweet">${tweetData.content.text}</p>

  <hr />
  <footer>
    <p>${tweetData.created_at}</p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`

  return $tweet;
}

$(document).ready(function () {
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
