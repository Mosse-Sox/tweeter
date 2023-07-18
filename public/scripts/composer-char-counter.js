$(document).ready(function () {
  console.log("Hello from Beansville!");

  let count = $(".counter").html();
  $("#tweet-text").on("input", (event) => {
    if (count < 140 && !event.originalEvent.data) {
      count++;
      console.log(count);
    } else if (event.originalEvent.data && count > 0) {
      count--;
      console.log(event.originalEvent.data);
    }

    $(".counter").html(count);
  });
});
