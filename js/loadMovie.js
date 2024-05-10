$.ajax({
    url: 'https://api.themoviedb.org/3/discover/movie',
    type: 'GET',
    data: {
        api_key: 'a1bf35fb81fc85767490536ac889539f',
        language: 'en-US',
        include_adult: false,
        include_video: false,
    },
    success: function(movies) { 

        movieId = 0;
    }
    
});