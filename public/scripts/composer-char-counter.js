/**
 * This function takes two params and then decides if the counter should display a red negative value or a black positive value
 * @param {jQuery element} counter this is the counter that counts down how many chars are left in a tweets char limit
 * @param {jQuery element} textareaElm this is the textarea that the user is inputing their tweets contents
 */
const composerCounter = function(counter, textareaElm) {
  const textareaValue = textareaElm.val();
  const textareaLength = textareaValue.length;

  const charsLeft = 140 - textareaLength;

  if (0 > charsLeft) {
    counter.css("color", "#FF0000");
  } else {
    counter.css("color", "#545149");
  }

  counter.html(charsLeft);
};
