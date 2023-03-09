import { useEffect, useState } from "react";
import { MovieDBMoviesResponse, Movie } from '../interfaces/movieInterface';
import movieDB from '../api/movieDB';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}


export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [ moviesState, setmoviesState] = useState<MoviesState>({

        nowPlaying:[],
        popular: [],
        topRated:[],
        upcoming:[],
    });


    const getMovies = async() => {

         const nowPlayingPromise =  movieDB.get<MovieDBMoviesResponse>('/now_playing');
         const PopularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
         const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
         const upcomingPromise =  movieDB.get<MovieDBMoviesResponse>('/upcoming');

         const resps = await Promise.all([
            nowPlayingPromise,
            PopularPromise,
            topRatedPromise,
            upcomingPromise ]);

        setmoviesState({
            nowPlaying: resps[0].data.results,
            popular: resps[1].data.results,
            topRated: resps[2].data.results,
            upcoming: resps[3].data.results,
        })



        //const peliculas = respNowPlaying.data.results;
        //setpeliculasEnCine(respNowPlaying.data.results);
        //setpeliculasPopulares(respPopular.data.results)

        setIsLoading(false);
    }
 
    useEffect(() => {
       //Now_playin trae las peliculas
       getMovies();
      }, []);

    return {
        ...moviesState,
        isLoading, 
    }
}
