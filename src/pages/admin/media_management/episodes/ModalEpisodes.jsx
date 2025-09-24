import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { Autocomplete } from '@mui/material';
import { useContext } from 'react';
import { ContextMovies, MovieProvider } from '../../../../contexts/MovieProvider';
import { getOjectById } from '../../../../services/reponsitory';
import { ContextSections } from '../../../../contexts/SectionProvider';

function ModalEpisodes({ open, handleClose, episode, setEpisode, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            episodeNumber: episode.episodeNumber ? "" : "Please enter episode number",
            movieId: episode.movieId ? "" : "Please enter movieid",
            videoUrl: episode.videoUrl ? "" : "Please enter videoUrl",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setEpisode(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (episode.id) {
            await updateDocument("Episodes", episode);
        } else {
            await addDocument("Episodes", episode);
        }
        handleClose();
        setEpisode(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setEpisode(inner);
        setError(inner);
    }

    const movies = useContext(ContextMovies);
    const sections = useContext(ContextSections);
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Episode</Typography>
                <Autocomplete
                    options={movies}
                    getOptionLabel={(option) => option.name}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={movies.find(m => m.id === episode.movieId) || null}
                    onChange={(event, value) =>
                        setEpisode(prev => ({ ...prev, movieId: value?.id || "" }))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Find the movie"
                            error={!!error.movieId}
                            helperText={error.movieId}
                        />
                    )}
                />
                <Autocomplete
                    options={sections}
                    getOptionLabel={(option) => option.season}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={sections.find(s => s.id === episode.sectionId) || null}
                    onChange={(event, value) =>
                        setEpisode(prev => ({ ...prev, sectionId: value?.id || "" }))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Find the section"
                        />
                    )}
                />

                <TextField
                    value={episode.episodeNumber || ""}
                    onChange={handleChange}
                    name='episodeNumber'
                    label="episode number"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.episodeNumber}
                    helperText={error.episodeNumber}
                    type='number'
                />
                <TextField
                    label="Video URL"
                    name="videoUrl"
                    value={episode.videoUrl || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    placeholder=""
                />


                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>

                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={addTask} variant="contained">
                        {episode?.id ? "Edit" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalEpisodes;