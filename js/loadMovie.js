// Função para obter o parâmetro da URL
function getUrlParameter(name, callback) {

    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    var movieId = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    callback(movieId);
}

// Chama a função getUrlParameter passando o nome do parâmetro e a função de callback
getUrlParameter('id', function(movieId) {
    // Chama a função loadMovie com o ID do filme
    loadMovie(movieId);
});

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
            let imageMovie = document.getElementsByClassName('movie_banner_container_classification')[0];

            // Descrição
            let movieBannerContainerOverview = document.getElementsByClassName('movie_banner_container_overview')[0];
            movieBannerContainerOverview.textContent = data.overview;
            console.log(data);

        },
        error: function(error) {
            // Trata possíveis erros na requisição
            console.error('Erro ao carregar o filme:', error);
        }
    });
}