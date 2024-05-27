document.addEventListener('DOMContentLoaded'), (event) => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdown && dropdownMenu) {
        dropdown.addEventListener('mouseover', () => {
            dropdownMenu.style.display = 'block';
        });

        dropdown.addEventListener('mouseout', () => {
            dropdownMenu.style.display = 'none';
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('pesq');
        const resultsContainer = document.getElementById('results');
        const API_KEY = 'a1bf35fb81fc85767490536ac889539f';
        const API_URL = 'https://api.themoviedb.org/3/search/movie';
    
        function fetchMovies(query) {
            const url = `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    displayResults(data.results);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.trim();
    
            if (query.length > 0) {
                fetchMovies(query);
            } else {
                resultsContainer.innerHTML = '';
                resultsContainer.style.display = 'none';
            }
        });
    
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                fetchMovies(query);
            } else {
                resultsContainer.innerHTML = '';
                resultsContainer.style.display = 'none';
            }
        });
    
        function displayResults(movies) {
            resultsContainer.innerHTML = '';
    
            if (movies && movies.length > 0) {
                movies.forEach(movie => {
                    const movieItem = document.createElement('div');
                    movieItem.classList.add('result-item');
                    movieItem.textContent = movie.title;
                    resultsContainer.appendChild(movieItem);
                });
                resultsContainer.style.display = 'block';
            } else {
                resultsContainer.textContent = 'No results found.';
                resultsContainer.style.display = 'block';
            }
        }
    });
}
    