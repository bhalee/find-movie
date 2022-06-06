import Header from './components/Header/Header';
import MoviesList from './components/Movies-list/Movies-list';
import { useCustomEventListener } from 'react-custom-events';
import React, { useState } from 'react';
import SearchBar from './components/Search-bar/Search-bar';
import styles from './App.module.css'

const App = () => {
    const [movies, setMovies] = useState([]);

    useCustomEventListener('onResultUpdate', (newMovies) => setMovies(newMovies));

    return (
        <div>
            <header>
                <Header />
            </header>
            <div className={styles.container}>
                <div className={styles.search}>
                    <SearchBar />
                </div>
                <div className={styles['movies-list']}>
                    <MoviesList movies={movies} />
                </div>
            </div>
        </div>
    );
}

export default App;
