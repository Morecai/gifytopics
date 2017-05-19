        var topics = ["BBQ", "scuba", "cats", "ferrets", "rpg", "guns", "star wars", "star trek"];


        function displayTopicInfo() {
            var topic = $(this).attr("data-name");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                topic + "&api_key=dc6zaTOxFJmzC&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                $("#topicInfo").text(JSON.stringify(response));;
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");
                    var topic = $(".gif").addClass("data-state");
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var topicImage = $("<img>");
                    topicImage.attr("src", results[i].images.fixed_height_still.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(topicImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
        }

        function renderButtons() {

            $("#topics-view").empty();

            for (var i = 0; i < topics.length; i++) {

                var a = $("<button>");
                a.addClass("topic");
                a.attr("data-name", topics[i]);
                a.text(topics[i]);
                $("#topics-view").append(a);
            }
        }

        $("#add-topic").on("click", function(e) {

            e.preventDefault();
            console.log(e);

            var topic = $("#topic-input").val().trim();
            topics.push(topic);

            renderButtons();
        });
        $(document).on("click", ".topic", displayTopicInfo);
        renderButtons();

        $(".gif").on("click", function() {

            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("data-state", "still");

            }
        });