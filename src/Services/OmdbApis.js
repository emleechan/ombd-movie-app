export const searchMovies = (searchValue) => {
    return fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_OMBD_API_KEY}`)
      .then(response => response.json())
      .then(jsonResponse => {
          return jsonResponse;
      })
      .catch((error) => {
        return error;
      });
}


