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

function ModalTrailer({ open, handleClose, trailer, setTrailer, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            movieId: trailer.movieId ? "" : "Please enter movieId",
            trailerUrl: trailer.trailerUrl ? "" : "Please enter trailerUrl",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setTrailer(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (trailer.id) {
            await updateDocument("Trailers", trailer);
        } else {
            await addDocument("Trailers", trailer);
        }
        handleClose();
        setTrailer(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setTrailer(inner);
        setError(inner);
    }
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setTrailer({ ...trailer, img: reader.result });
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
                <Typography variant="h6">Modal Add Trailer</Typography>
                <TextField
                    value={trailer.trailerUrl || ""}
                    onChange={handleChange}
                    name='trailerUrl'
                    label="trailerUrl"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.trailerUrl}
                    helperText={error.trailerUrl}
                />
                <Autocomplete
                    options={movies}
                    getOptionLabel={(option) => option.name}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={getOjectById(movies, trailer.movieId)}
                    onChange={(event, value) =>
                        setTrailer(prev => ({ ...prev, movieId: value?.id || "" }))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Find the author"
                            error={!!error.movieId}
                            helperText={error.movieId}
                        />
                    )}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={addTask} variant="contained">
                        {trailer?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}


export default ModalTrailer;