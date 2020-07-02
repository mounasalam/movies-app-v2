
const MOVIE_DB_API_KEY = '27c500e5eb53056a67dbc0c58720a059';
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';
export default  URL = `${MOVIE_DB_BASE_URL}/movie/top_rated?api_key=${MOVIE_DB_API_KEY}&language=en-US`;


export const getSearchURL = ({query}) => {
  let searchUrl = 'test';
  console.log(query)
  return searchUrl;
}
const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
  }
  return baseUrl;
}

export const getTopMovies = async ({page}) => {

  const fullUrl = createMovieDbUrl('/movie/top_rated', {
    page
  });
  return fetch(fullUrl);
}

export const searchMovies = async ({ page, query}) => {
  const fullUrl = createMovieDbUrl('/search/movie', {
    page,
    query
  });
  return fetch(fullUrl);
}

export const getMovieDetails = async ({movieId}) => {
  const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
  return fetch(fullUrl);
}
