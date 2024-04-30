const API_KEY = "a1bf35fb81fc85767490536ac889539f";

const options = {
    method: 'GET', 
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWJmMzVmYjgxZmM4NTc2NzQ5MDUzNmFjODg5NTM5ZiIsInN1YiI6IjY2MzBjOWVlMjQyZjk0MDEyYzFlN2MzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QNKuKhjXsAU_uPoBEG6yt5luOWd2Rjt7fqVqOGSQwfI'
    }
  };
  
  fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));