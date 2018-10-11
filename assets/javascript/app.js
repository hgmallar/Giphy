var api_key = "k2XU5SOffbGbss3ubbTpBhrD5oDnB8Tg";
//stored button values
var topics = ["Legos", "Dinosaurs", "Popcorn", "Chocolate", "Dogs", "Ninjago", "Ghostbusters", "Hotwheels", "Pokemon", "Soccer", "Nexo Knights", "Star Wars", "Butterflies", "Ice Cream", "Robots", "Sharks", "Airplanes"];

function reprintButtons() {
    //puts buttons on screen
    //clear all buttons
    $(".buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        //go through the array one by one and append the buttons to the buttons div
        $(".buttons").append("<button type='button' class='btn btn-info gif-button ml-2 mt-2' count='10'>" + topics[i]);
    }
}

//print the buttons for the values in the array initially
reprintButtons();

$("#submit-button").on("click", function () {
    //grab the value of the input box when submit is clicked
    var inputVal = $('input').val();
    //push it to the topics array
    topics.push(inputVal);
    //reprint the buttons
    reprintButtons();
});

$(document).on("click", ".gif-button", function () {
    //use document because buttons are added dynamically
    //clear the previous gifs
    $(".gifs").empty();

    //save the clicked button and it's count value
    var buttonClicked = $(this);
    var count = parseInt(buttonClicked.attr("count"));

    //when a gif button is selected, send ajax search request for the count of gifs.
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q="
    queryUrl += buttonClicked.text();
    queryUrl += "&limit="
    queryUrl += count;
    queryUrl += "&api_key=";
    queryUrl += api_key;
    console.log(queryUrl);

    //get request
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        //when gifs are ready, append them to the page
        for (var i = 0; i < count; i++) {
            //create a card
            var card = $("<div>").addClass("card").addClass("float-left").addClass("mx-2").addClass("my-2");
            //create an image
            var image = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).addClass("card-img-top");
            image.attr("data-still", response.data[i].images.fixed_height_still.url);
            image.attr("data-animate", response.data[i].images.fixed_height.url);
            image.attr("data-state", "still").addClass("gif");
           //create a carBody with text
            var cardBody = $("<div>").addClass("card-body");
            var p = $("<p>").addClass("card-text").text("Rating: " + response.data[i].rating.toUpperCase());
            p.append($("<p>").addClass("card-text").text("Title: " + response.data[i].title.toUpperCase()));
            //append the text to the cardBody
            cardBody.append(p);
            //append the image and cardBody to the card
            card.append(image).append(cardBody);
            //append the card to the gifs div
            $(".gifs").append(card);
        }
        //increase the count in the buttonClicked attribute to increase it by 10 the next time it is clicked
        count += 10;
        buttonClicked.attr("count", count);
    });



});

$(document).on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value and data-state to still
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

