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
            let movieBannerContainerTitle = document.querySelector(".movie_banner_container_title");
            movieBannerContainerTitle.textContent = data.title;

            // Informações extra
            let movieBannerContainerExtraInfo = document.querySelector(".movie_banner_container_extra_info");
            let genresList = data.genres.map(genre => genre.name);
            genresList = genresList.join(', ');

                //runtime
                const hours = Math.floor(data.runtime / 60);
                const minutes = data.runtime % 60;
                const runtimeFormatted = `${hours}h ${minutes}m`;

            movieBannerContainerExtraInfo.textContent = `${data.release_date} | ${genresList} | ${runtimeFormatted}`;

            // Slogan
            let movieBannerContainerSlogan = document.querySelector(".movie_banner_container_slogan");
            movieBannerContainerSlogan.textContent = data.tagline;

            // Votos - Classificação
            let fillBar = document.querySelector(".fill-bar");
            let appendDivGenre = document.querySelector('.rating-value');
            fillBar.style.width = `${Math.round(data.vote_average / 10 * 100)}%`; //width fillbar = vote_average * 10; ex: 3.9 to 39%
            appendDivGenre.textContent = Math.round(data.vote_average * 10) / 10; //round votes to 2 numbers

            // Imagem
            let imageMovie = document.querySelector('.right_movie_banner_div_image'); //find div for image placement

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
            let containerImageMovie = document.querySelector(".movie_banner_container");
            if (containerImageMovie) {
                if (data.poster_path) {
                    let imageUrl = `https://image.tmdb.org/t/p/w780${data.backdrop_path}`;
                    containerImageMovie.setAttribute("style", `background-image: url(${imageUrl}); background-repeat: no-repeat;`);
                } else {
                    console.error('O caminho do poster não está disponível.');
                }
            } 

            // Descrição
            let movieBannerContainerOverview = document.querySelector(".movie_banner_container_overview");
            movieBannerContainerOverview.textContent = data.overview;
            console.log(data);
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
                                <img src="https://image.tmdb.org/t/p/w45${member.profile_path}" alt="${member.name}" onerror="this.src='' 
                                this.classList.add('no-border-radius');">
                            </div>
                            <div class="movie_participant_div_info">
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
