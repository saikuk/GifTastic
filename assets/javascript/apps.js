$(document).ready(function () {

    var topics = ["Dim Sum", "salad", "bananas", "Steak", "Chocolate pudding", "Mashed sweet potatoes","Pizza"];

    function renderButtons() {
        $("#buttons-row").empty();

        for (var i = 0; i < topics.length; i++) {

            var button = $("<button>" + topics[i] + "</button>");

            button.addClass("topics");
            button.attr("data-name", topics[i]);
            $("#buttons-row").append(button);
        }
    };

    $("#add-food").on("click", function(event) {
        event.preventDefault();
        var food = $("#food-input").val();
        topics.push(food); 
        renderButtons();
    });


    $("#buttons-row").on("click", ".topics", function () {
        var foods = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        foods + "&api_key=QNVW2yqivg2dzQ6UoG9dUu2eLor6EqZM&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            var result = response.data;
            for (var i = 0; i < result.length; i++) {
                
                var gifImageInDiv = $("<div>");
                gifImageInDiv.addClass("gifDiv");

                var rating = result[i].rating;
                var pTag = $("<p>").text('rating: ' + rating);

                var foodImages = $("<img>").addClass("gifs");
                foodImages.attr("src", result[i].images.fixed_height_still.url);
                foodImages.attr("animate", result[i].images.fixed_height.url);
                foodImages.attr("still", result[i].images.fixed_height_still.url);
                foodImages.attr("data-state", "still");
                
                gifImageInDiv.append(foodImages);
                gifImageInDiv.prepend(pTag);
                $("#displayGifs").prepend(gifImageInDiv);
            }
        });

        $('#displayGifs').on('click', '.gifs', function(){
            
            var animation = $(this).attr('data-state');
            if (animation === 'still') {
                $(this).attr('src', $(this).attr('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).attr('still'));
                $(this).attr('data-state', 'still')
            }
        })
    })

    renderButtons();

});