$(document).ready(function () {
    const searchInput = $('#searchInput');
    const resultsContainer = $('#results');
    const API_KEY = 'a1bf35fb81fc85767490536ac889539f';
    const API_URL = 'https://api.themoviedb.org/3/search/movie';

    function fetchMovies(query) {
        $.ajax({
            url: API_URL,
            type: 'GET',
            data: {
                api_key: API_KEY,
                query: query,
                language: 'en-US'
            },
            success: function (data) {
                displayResults(data.results);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
                resultsContainer.html('<div class="result-item">Error fetching data</div>');
                resultsContainer.show();
            }
        });
    }

    searchInput.on('input', function () {
        const query = searchInput.val().trim();
        if (query.length > 0) {
            fetchMovies(query);
        } else {
            resultsContainer.empty().hide();
        }
    });

    function displayResults(movies) {
        resultsContainer.empty();
        if (movies && movies.length > 0) {
            movies.slice(0, 5).forEach(movie => {
                const movieItem = $('<div class="result-item"></div>').text(movie.title);
                resultsContainer.append(movieItem);
            });
            resultsContainer.show();
        } else {
            resultsContainer.html('<div class="result-item">No results found.</div>');
            resultsContainer.show();
        }
    }
});