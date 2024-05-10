$(document).ready(function(){
    // Fazer solicitação à API TMDB para obter o ID do gênero
    $.ajax({
        url: 'https://api.themoviedb.org/3/genre/movie/list',
        type: 'GET',
        data: {
            api_key: 'a1bf35fb81fc85767490536ac889539f',
            language: 'en-US',
            sort_by: '',
            include_video: false,
            page: 1,
            page_size: 10
        },
        success: function(data) {
            // Encontrar o ID do gênero
            var romanceGenre = data.genres.find(function(genre) {
                return genre.name === 'Romance';
            });

            // Verificar se o gênero foi encontrado
            if (romanceGenre) {
                // Fazer outra solicitação para obter os filmes do gênero 
                $.ajax({
                    url: 'https://api.themoviedb.org/3/discover/movie',
                    type: 'GET',
                    data: {
                        api_key: 'a1bf35fb81fc85767490536ac889539f',
                        language: 'en-US',
                        sort_by: 'popularity.desc',
                        include_adult: false,
                        include_video: false,
                        page: 1,
                        with_genres: romanceGenre.id
                    },
                    success: function(movies) {
                        // Loop através dos resultados e criar slides do carousel
                        movies.results.forEach(function(movie) {
                            // Fazer outra solicitação para obter informações detalhadas do filme
                            $.ajax({
                                url: 'https://api.themoviedb.org/3/movie/' + movie.id,
                                type: 'GET',
                                data: {
                                    api_key: 'a1bf35fb81fc85767490536ac889539f',
                                    language: 'en-US'        
                                }     
                            });
                  
                            let movieAbout = movie.overview
                            let votes = Math.round(movie.vote_average * 10) / 10;
                            let appendDivGenre = document.getElementsByClassName('sort_by_genre_romance_list');


                            let slide = '<div class="sort_by_genre_poster_div"><img src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '"><div class="sort_by_genre_movie_text"><h3>' + movie.name + '</h3><span class="green">' + votes + '</span></div><div class="overview">' + movie.overview + '</div></div>';
                            $(appendDivGenre).append(slide);

                            $(slide).on('click', function() {
                                
                                let movieId =  {
                                   movieId: movie.id
                                };
                            });
                        });        
                    }
                });
            } else {
                console.log('Gênero de romance não encontrado');
            }
        }
    });
});