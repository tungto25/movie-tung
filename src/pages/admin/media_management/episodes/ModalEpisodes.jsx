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

function ModalEpisodes({ open, handleClose, episode, setEpisode, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            title: episode.title ? "" : "Please enter title",
            description: episode.description ? "" : "Please enter description",
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
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setEpisode({ ...episode, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }
    const movies = useContext(ContextMovies);
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Episode</Typography>
                <TextField
                    value={episode.title || ""}
                    onChange={handleChange}
                    name='title'
                    label="title"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.title}
                    helperText={error.title}
                />
                <TextField
                    value={episode.description || ""}
                    onChange={handleChange}
                    name='description'
                    label="description"
                    fullWidth
                    rows={3}
                    multiline
                    sx={{ mt: 2 }}
                    error={!!error.description}
                    helperText={error.description}
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
                <Autocomplete
                    options={movies}
                    getOptionLabel={(option) => option.name}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={getOjectById(movies, episode.title)}
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