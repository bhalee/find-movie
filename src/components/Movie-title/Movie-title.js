import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getWikiPediaDetails } from '../../utils/fetch';
import styles from './Movie-title.module.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const MovieTitle = (props) => {
    const [open, setOpen] = useState(false);
    const [movieInfo, setMovieInfo] = useState(false);

    const handleOpen = async () => {
        const wikiDetails = await getWikiPediaDetails(props.title);
        setMovieInfo(wikiDetails)
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const renderCategories = () => {
        return (movieInfo?.categories?.map((category, index) => (
            <span
                key={`box-category-${index}`}
                className={styles.category}
            >
                {category.title}
            </span>
        )))
    }

    const renderDescription = () => {
        if (movieInfo?.description) {
            return `${movieInfo.description}...`
        }
        return 'No description for this movie.'
    }

    const renderWikipediaDetails = () => {
        return <React.Fragment>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <h3>wikipedia:</h3>
                {renderDescription()}
            </Typography>

            {movieInfo?.categories?.length > 0 && <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {renderCategories()}
            </Typography>}
        </React.Fragment>
    }

    return (
      <div>
          <Button onClick={handleOpen}>{props.title} ({props.year})</Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      {props.title} ({props.year})
                  </Typography>
                  {(movieInfo?.categories?.length > 0 && movieInfo?.description) && renderWikipediaDetails()}
                  <Button
                      onClick={() => window.open(`https://www.themoviedb.org/movie/${props.id}`, '_blank').focus()}
                  >
                      TMDB
                  </Button>
                  {movieInfo?.pageid && <Button
                      onClick={() => window.open(`http://en.wikipedia.org/?curid=${movieInfo.pageid}`, '_blank').focus()}
                  >
                      Wikipedia
                  </Button>}
              </Box>
          </Modal>
      </div>
    );
}

export default MovieTitle;
