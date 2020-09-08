export const searchMovies = (searchValue) => {
    return fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=6e6fccd5`)
      .then(response => response.json())
      .then(jsonResponse => {
          return jsonResponse;
      })
      .catch((error) => {
        return error;
      });
}


