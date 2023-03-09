import {useState, useEffect} from 'react';
import movieDB from '../api/movieDB';
import {MovieFull, MovieDBMoviesResponse} from '../interfaces/movieInterface';
import {CreditsResponse, Cast} from '../interfaces/creditsInterface';
interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

    const [MovieDetailResp, castPromiseResp] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    //console.log(resp.data.overview)

    setState({
      isLoading: false,
      movieFull: MovieDetailResp.data,
      cast: castPromiseResp.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
