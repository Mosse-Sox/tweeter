/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {
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
    <p>${tweet.created_at}</p>
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
    container.append($tweet);
  }
};

const tweets = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1689623163705,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1689709563705,
  },
];

$(document).ready(function () {
  const $container = $("#tweets-container");

  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  renderTweets($container, tweets);
});
