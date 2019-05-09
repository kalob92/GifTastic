// topics list of all search terms including ones from user
var topics = ['roses', 'sunflower', 'bloom', 'gardening', 'plants', 'venus flytrap', 'bees', 'cactus flower'];

// for each topic item, we should have a new button made with some bootstrap classes, index indicators, then appended to the end of the list
function makeButtons() {
    // clear out the other buttons so we won't keep repeating the button group over and over
    $('#buttons-here').empty();
  
    for (var i=0; i<topics.length; i++) {

        var button = $('<button>');
        button.addClass('topic btn btn-success');
        button.attr('data-name', topics[i]);
        button.text(topics[i]);
        $('#buttons-here').append(button);
    };

    newFig();
};


// when we click the submit button on the search, it should take the trimmed value of the searchTerm and add it to our button list
$('#submitButton').on('click', function() {
    // event.preventDefault();
    var searchTerm = $('#search-figs').val().trim();
    console.log('search term: ' + searchTerm);
    topics.push(searchTerm);
    makeButtons();
    //should clear our search box
    $("#search-figs").val('');
    return false;
});

makeButtons();


function newFig() {
    $('button').on('click', function() {
        var p = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=iv9GIPLbN1c0jMVrnctrmsYePNbjzvTA&limit=10";

        $.ajax({url:queryURL, method:'GET'})
        .done(function(response) {
            var results = response.data;
            console.log(response);

            for (var i = 0; i < results.length; i++) {
                
                var gifHolder = $('<div class="item">');
                var rating = results[i].rating;
                var p = $('<p>').text("GIF rated: " + rating);

                var giphyGIF = $('<img>');
                giphyGIF.attr('src', results[i].images.fixed_height_still.url);
                giphyGIF.attr('data-still', results[i].images.fixed_height_still.url);
                giphyGIF.attr('data-animate', results[i].images.fixed_height.url);
                giphyGIF.attr('data-state', results[i].images.fixed_height_still.url);

                gifHolder.append(giphyGIF);
                gifHolder.append(p);

                $('#gifs-here').prepend(gifHolder);
            }

            $('.item').children('img').on('click', function() {
                var motion = $(this).attr('data-state');

                if (motion == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                };
            });
        });
    });
}