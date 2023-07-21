$(document).ready(function () {


  $(".new-tweet").on("input", (event) => {

    const textareaElm = $(this).find("textarea#tweet-text");
    
    const textareaValue = textareaElm.val();
    const textareaLength = textareaValue.length;

    const charsLeft = 140 - textareaLength;
    
    const counter = $(this).find(".counter");
    if (0 > charsLeft) {
      counter.css("color", "#FF0000");
    } else {
      counter.css("color", "#545149");
    }

    counter.html(charsLeft);
  });
});
