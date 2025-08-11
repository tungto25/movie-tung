import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { MenuItem } from '@mui/material';

function ModalMovieTypes({ open, handleClose, movieType, setMovieType, error, setError, inner, handleUpdate }) {
    useEffect(() => {
        if (open) {
            setError({}); // Reset lỗi mỗi lần mở modal
        }
    }, [open]);

    const validation = () => {
        const newError = {
            name: movieType.name ? "" : "Please enter name",
            type: movieType.type ? "" : "Please enter type",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setMovieType(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (movieType.id) {
            await updateDocument("MovieTypes", movieType);
        } else {
            await addDocument("MovieTypes", movieType);
        }
        handleClose();
        setMovieType(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setMovieType(inner);
        setError(inner);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Movie Type</Typography>
                <TextField
                    value={movieType.name || ""}
                    onChange={handleChange}
                    name='name'
                    label="Name"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.name}
                    helperText={error.name}
                />
                <TextField
                    select
                    value={movieType.type || ""}
                    onChange={handleChange}
                    name='type'
                    label="type"
                    fullWidth
                    rows={2}
                    sx={{ mt: 2 }}
                    error={!!error.description}
                    helperText={error.description}>
                    <MenuItem value="series">Series</MenuItem>
                    <MenuItem value="movie">Movie</MenuItem>
                </TextField>

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button onClick={addTask} variant="contained">
                        {movieType?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalMovieTypes;