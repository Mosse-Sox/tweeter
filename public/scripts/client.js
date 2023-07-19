/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
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

const renderTweets = function(container, tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    container.prepend($tweet);
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

$(document).ready(function() {
  const $tweetContainer = $("#tweets-container");
  const $container = $(".new-tweet");

  $container.on("submit", function(event) {
    event.preventDefault();

    console.log("submitted!");
  });

  renderTweets($tweetContainer, tweets);
  $(".timeago").timeago();
});
