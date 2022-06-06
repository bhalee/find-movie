import React from 'react';
import MovieInfo from '../Movie-info/Movie-info';
import style from './Movies-list.module.css'

const MoviesList = ({movies}) => {
    return (
        <div className={style.container}>
            {movies.map((movie, index)=> {
                const year = new Date(movie.releaseDate).getFullYear();
                return (
                <MovieInfo
                    key={`movie-info-${index}`}
                    name={movie.name}
                    year={year}
                    poster={movie.poster?.small}
                    overview={movie.overview}
                    score={movie.score}
                    categories={movie.genres}
                    id={movie.id}
                >
                </MovieInfo>
                )
            })}
        </div>
    )
}

export default MoviesList;