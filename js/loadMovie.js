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

            // Votos - Classificação
            let appendDivGenre = document.getElementsByClassName('movie_banner_container_classification')[0];
            appendDivGenre.textContent = Math.round(data.vote_average * 10) / 10;
            
            // Imagem
            let imageMovie = document.getElementsByClassName('right_movie_banner_div_image')[0];
            if (imageMovie) {
                if (data.poster_path) {
                    let imageUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
                    imageMovie.setAttribute("style", `background-image: url(${imageUrl}); background-repeat: no-repeat;`);
                } else {
                    console.error('O caminho do poster não está disponível.');
                }
            } else {
                console.error('Elemento com a classe right_movie_banner_image não encontrado.');
            }

            // Container Imagem
            let containerImageMovie = document.getElementsByClassName('movie_banner_container')[0];
            if (containerImageMovie) {
                if (data.poster_path) {
                    let imageUrl = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
                    containerImageMovie.setAttribute("style", `background-image: url(${imageUrl}); background-repeat: no-repeat;`);
                } else {
                    console.error('O caminho do poster não está disponível.');
                }
            } else {
                console.error('Elemento com a classe right_movie_banner_image não encontrado.');
            }
            // Descrição
            let movieBannerContainerOverview = document.getElementsByClassName('movie_banner_container_overview')[0];
            movieBannerContainerOverview.textContent = data.overview;
            console.log(data);
            
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


getUrlParameter('id', function(movieId) {
    // Chama a função loadMovie com o ID do filme
    loadMovie(movieId);
});