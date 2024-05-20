// Função para obter o parâmetro da URL
function getUrlParameter(name, callback) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    var movieId = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    callback(movieId);
}


getUrlParameter('id', function(movieId) {
    loadMovie(movieId);
});