// Função para obter o parâmetro da URL
function getUrlParameter(name, callback) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    var movieId = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    callback(movieId);
}

// Função para carregar as informações do filme
function loadMovie(movieId) {
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}`,
        type: 'GET',
        data: {
            api_key: 'a1bf35fb81fc85767490536ac889539f',
            language: 'en-US',
            include_video: true,
        },
        success: function(data) {

            // Titulo
            let movieBannerContainerTitle = document.getElementsByClassName('movie_banner_container_title')[0];
            movieBannerContainerTitle.textContent = data.title;

            // Informações extra
            let movieBannerContainerExtraInfo = document.getElementsByClassName('movie_banner_container_extra_info')[0];
            let genresList = data.genres.map(genre => genre.name);
            genresList = genresList.join(', ');

                //runtime
                const hours = Math.floor(data.runtime / 60);
                const minutes = data.runtime % 60;
                const runtimeFormatted = `${hours}h ${minutes}m`;

            movieBannerContainerExtraInfo.textContent = `${data.release_date} | ${genresList} | ${runtimeFormatted}`;

            //Slogan
            let movieBannerContainerSlogan = document.getElementsByClassName('movie_banner_container_slogan')[0];
            movieBannerContainerSlogan.textContent = data.tagline;

            // Votos - Classificação
            let fillBar = document.getElementsByClassName('fill-bar')[0];
            let appendDivGenre = document.getElementsByClassName('rating-value')[0];
            fillBar.style.width = `${Math.round(data.vote_average / 10 * 100)}%`; //width fillbar = vote_average * 10; ex: 3.9 to 39%
            appendDivGenre.textContent = Math.round(data.vote_average * 10) / 10; //round votes to 2 numbers

            // Imagem
            let imageMovie = document.getElementsByClassName('right_movie_banner_div_image')[0]; //find div for image placement

            //Diretor
            loadCredits(movieId);

            if (imageMovie) { // If exists
                if (data.poster_path) { // If exists
                    let imageUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`; //link to image
                    //set image to background
                    imageMovie.setAttribute("style", `background-image: url(${imageUrl}); background-repeat: no-repeat;`); 
                } else {
                    console.error('O caminho do poster não está disponível.');
                }
            } 

            // Container Imagem
            let containerImageMovie = document.getElementsByClassName('movie_banner_container')[0];
            if (containerImageMovie) {
                if (data.poster_path) {
                    let imageUrl = `https://image.tmdb.org/t/p/w780${data.backdrop_path}`;
                    containerImageMovie.setAttribute("style", `background-image: url(${imageUrl}); background-repeat: no-repeat;`);
                } else {
                    console.error('O caminho do poster não está disponível.');
                }
            } 
            // Descrição
            let movieBannerContainerOverview = document.getElementsByClassName('movie_banner_container_overview')[0];
            movieBannerContainerOverview.textContent = data.overview;
            console.log(data);
            

            if (data.videos.results.length > 0) {
                // O primeiro resultado geralmente é o trailer
                let trailerKey = data.videos.results[0].key;
                let trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
                console.log("Trailer URL:", trailerUrl);
            } else {
                console.log("Nenhum trailer disponível para este filme.");
            }
            
            // Agora que os dados do filme foram carregados, chame a função onPageLoaded
            onPageLoaded();
        },
        error: function(error) {
            // Trata possíveis erros na requisição
            console.error('Erro ao carregar o filme:', error);
        }
    });
}

// Função a ser chamada após o carregamento completo da página
function onPageLoaded() {
    console.log('A página foi carregada completamente.');
    
}

function loadCredits(movieId) {
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        type: 'GET',
        data: {
            api_key: 'a1bf35fb81fc85767490536ac889539f',
        },
        success: function(data) {
            console.log(data);
            let director = data.crew.find(member => member.job === 'Director');
            let story = data.crew.find(member => member.job === 'Writer');
            let screenplay = data.crew.find(member => member.job === 'Screenplay');
            
            // Achar variaveis
            let movieBannerContainerDirector = document.getElementById("left_movie_banner_social_director");
            let movieBannerContainerStory = document.getElementById("left_movie_banner_social_story");
            let movieBannerContainerScreenplay = document.getElementById("left_movie_banner_social_screenplay");

            if (director) {
                movieBannerContainerDirector.textContent = `${director.name}`;
            } else {
                movieBannerContainerDirector.textContent = 'Sem informações';
            }

            if (story) {
                movieBannerContainerStory.textContent = `${story.name}`;
            } else {
                movieBannerContainerStory.textContent = 'Sem informações';
            }

            if (screenplay) {
                movieBannerContainerScreenplay.textContent = `${screenplay.name}`;
            } else {
                movieBannerContainerScreenplay.textContent = 'Sem informações';
            }

            const castContainer = document.getElementById('cast-container');
                    data.cast.forEach(member => {
                        const castMemberDiv = document.createElement('div');
                        castMemberDiv.classList.add('movie_participant');
                        castMemberDiv.innerHTML = `
                            <div class="movie_participant_image_div">
                                <img src="https://image.tmdb.org/t/p/w45${member.profile_path}" alt="${member.name}" onerror="this.src='placeholder.jpg';">
                            </div>
                            <div>
                                <p class="movie_participant_name">${member.name}</p>
                                <p class="movie_participant_character">as ${member.character}</p>
                            </div>
                        `;
                        castContainer.appendChild(castMemberDiv);
                    });
        },
        error: function(error) {
            console.error('Erro ao carregar os créditos do filme:', error);
        }
    });
}

getUrlParameter('id', function(movieId) {
    // Chama a função loadMovie com o ID do filme
    loadMovie(movieId);
});

