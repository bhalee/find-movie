import React from 'react';
import NO_IMG_AVAILABLE from '../../assets/no_img_available.jpeg'
import styles from './Movie-info.module.css'
import Rating from "@mui/material/Rating";
import MovieTitle from '../Movie-title/Movie-title';

const MovieInfo = (props) => {
    const renderPoster = () => {
        return (
            <img
                className={styles.poster}
                src={props.poster ?? NO_IMG_AVAILABLE}
                alt={props.name}
            >
            </img>
        )
    }

    const renderTitle = () => {
        return (
            <MovieTitle
                title={props.name}
                year={props.year}
                id={props.id}
            ></MovieTitle>
        )
    }

    const renderScore = () => {
        const scoreOnFivePointScale = Number((props.score / 2).toFixed(1));
        return (
            <div className={styles.score}>
                <Rating
                    name="half-rating-read"
                    size="small"
                    value={scoreOnFivePointScale}
                    precision={0.1}
                    readOnly
                />
                <span>
                    {props.score}
                </span>
            </div>
        )
    }

    const renderCategories = () => {
        return (
            <div className={styles.categories}>
                {props.categories.map(({ name }, index) => {
                    return (
                        <span key={`category-${index}`}>
                            {name}
                        </span>
                    )
                })}
            </div>
        )
    }

    const renderOverview = () => {
        return <p className={styles.overview}>
            {props.overview}
        </p>
    }

    return (
        <div className={styles.container}>
            {renderPoster()}
            <div className={styles.details}>
                {renderTitle()}
                {renderScore()}
                {renderCategories()}
                {renderOverview()}
            </div>
        </div>
    )
}

export default MovieInfo;
