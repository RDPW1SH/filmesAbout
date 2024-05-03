
$(document).ready(function(){
    // Fazer solicitação à API TMDB para obter dados dos filmes
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
            page_size: 5
        },
        success: function(data) {
            // Loop através dos resultados e criar slides do carousel
            data.results.forEach(function(movie) {
                var slide = '<div class="movie-slide"><img src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '"></div>';
                $('.carousel_container').append(slide);
            });

            // Inicializar o Slick Carousel
            $('.carousel_container').slick({
                dots: true,
                infinite: true,
                autoplay: true,
                draggable: false,
                speed: 3000,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: true
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                  // You can unslick at a given breakpoint now by adding:
                  // settings: "unslick"
                  // instead of a settings object
                ]
              });
        }
    });
});