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
            page_size: 5
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
                        //contador de filmes eibidos
                        let counter = 0;
                        //para cada filme:
                        movies.results.forEach(function(movie) {
                            //se forem apresentados mais que 5 filmes para
                            if (counter >= 5) {
                                return; // Sai do loop se já exibimos 5 filmes
                            }
                            counter++;

                            //arredondar votos para 1 casa decimal
                            let votes = Math.round(movie.vote_average * 10) / 10;
                            let appendDivGenre = document.getElementsByClassName('sort_by_genre_list_romance');

                        
                            let overview = movie.overview;
                            //Quando o sobre do filme for maior que 200 caracteres
                            if (overview.length > 200) {
                                overview = overview.substring(0, 200) + '...';
                            }

                            //criacao do filme
                            let slide = `<div class="sort_by_genre_poster_div">
                                            <a href="movies.html?id=${movie.id}" class="movie-link">
                                            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                                            <div class="sort_by_genre_movie_text">
                                                <h3>${movie.title}</h3>
                                                <span class="green">${votes}</span>
                                            </div>
                                            <div class="overview">${overview}</div>
                                            </a>
                                        </div>`;
                            $(appendDivGenre).append(slide);
                        });        
                    }
                });
            } else {
                console.log('Gênero de romance não encontrado');
            }
        }
    }),

    $.ajax({
        url: 'https://api.themoviedb.org/3/genre/movie/list',
        type: 'GET',
        data: {
            api_key: 'a1bf35fb81fc85767490536ac889539f',
            language: 'en-US',
            sort_by: '',
            include_video: false,
            page: 1,
            page_size: 5
        },
        success: function(data) {
            // Encontrar o ID do gênero
            var horrorGenre = data.genres.find(function(genre) {
                return genre.name === 'Horror';
            });

            // Verificar se o gênero foi encontrado
            if (horrorGenre) {
                // Fazer uma solicitação para obter os filmes do gênero 
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
                        with_genres: horrorGenre.id
                    },
                    success: function(movies) {
                        //contador de filmes eibidos
                        let counter = 0;
                        //para cada filme:
                        movies.results.forEach(function(movie) {
                            //se forem apresentados mais que 5 filmes para
                            if (counter >= 5) {
                                return; // Sai do loop se já exibimos 5 filmes
                            }
                            counter++;

                            //arredondar votos para 1 casa decimal
                            let votes = Math.round(movie.vote_average * 10) / 10;
                            let appendDivGenre = document.getElementsByClassName('sort_by_genre_list_horror');

                        
                            let overview = movie.overview;
                            //Quando o sobre do filme for maior que 200 caracteres
                            if (overview.length > 200) {
                                overview = overview.substring(0, 200) + '...';
                            }

                            //criacao do filme
                            let slide = `<div class="sort_by_genre_poster_div">
                                            <a href="movies.html?id=${movie.id}" class="movie-link">
                                            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                                            <div class="sort_by_genre_movie_text">
                                                <h3>${movie.title}</h3>
                                                <span class="green">${votes}</span>
                                            </div>
                                            <div class="overview">${overview}</div>
                                            </a>
                                        </div>`;
                            $(appendDivGenre).append(slide);
                        });        
                    }
                });
            } else {
                console.log('Gênero de horror não encontrado');
            }
        }
    });
});