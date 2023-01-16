import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
  api_key: '4550a8eec95d666ba10dfff9664c0efb',
};

export const getTrending = async () => {
  const { data } = await axios.get('/trending/movie/day');
  return data;
};

export const getMoviesByQuery = async query => {
  const params = { query: query };
  const { data } = await axios.get('/search/movie', { params });
  return data;
};

export const getMoviesById = async id => {
  const { data } = await axios.get(`/movie/${id}`);
  return data;
};

export const getCast = async id => {
  const { data } = await axios.get(`/movie/${id}/credits`);
  return data;
};

export const getReviews = async id => {
  const { data } = await axios.get(`/movie/${id}/reviews`);
  return data;
};
