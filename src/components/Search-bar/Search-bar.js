import React, { useState, useEffect } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import styles from './Search-bar.module.css'
import searchMovie from '../../utils/fetch.js'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';

const SearchBar = () => {
    const [result, setResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const fetchMovies = async () => {
        if (searchTerm.length > 2) {
            try {
                setIsLoading(true)
                const searchMovies = await searchMovie(searchTerm)
                setResult(searchMovies);
            } catch (error) {
                console.error(`Failed load the movies. Error: ${error}`);
            } finally {
                setIsLoading(false)
            }
        } else {
            setResult([])
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => fetchMovies(), 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    useEffect(() => {
        if (isButtonClicked && !isLoading) {
            emitCustomEvent('onResultUpdate', result);
            setIsButtonClicked(false)
        }
    }, [isButtonClicked, result, isLoading])

    const getAutocompleteOptions = () => {
        return result.map((option) => option.name).slice(0, 5)
    }

    const renderSearchInput = (params) => {
        return (
            <TextField
                sx={{ width: '22ch' }}
                {...params}
                id="standard-basic"
                label="Search"
                variant="standard"
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    endAdornment: (
                        <React.Fragment>
                            {isLoading && !isButtonClicked ? <CircularProgress color="inherit" size={20} /> : null}
                        </React.Fragment>
                    ),
                }}
            />
        )
    }

    const handleButtonClick = () => {
        setIsButtonClicked(true)
    }

    return (
        <div className={styles.search}>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="flex-end"
            >
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    onSelect={(e)=> setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            fetchMovies()
                            setIsButtonClicked(true)
                        }
                    }}
                    options={getAutocompleteOptions()}
                    renderInput={(params) => renderSearchInput(params)}
                />
                <LoadingButton
                    sx={{ height: 30 }}
                    size="small"
                    onClick={handleButtonClick}
                    loading={isButtonClicked}
                    variant="outlined"
                >
                    ok
                </LoadingButton>
            </Stack>
        </div>
    );
}

export default SearchBar;
