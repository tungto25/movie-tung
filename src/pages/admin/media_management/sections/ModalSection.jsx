import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { Autocomplete, MenuItem } from '@mui/material';
import { ContextMovies } from '../../../../contexts/MovieProvider';
import { getOjectById } from '../../../../services/reponsitory';

function ModalSection({ open, handleClose, section, setSection, error, setError, inner, handleUpdate, movies }) {

    useEffect(() => {
        if (open) {
            setError({}); // Reset lỗi mỗi lần mở modal
        }
    }, [open]);

    const validation = () => {
        const newError = {
            title: section.title ? "" : "Please enter title",
            type: section.type ? "" : "Please enter type",
            movieId: section.movieId ? "" : "Please enter movieId",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setSection(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (section.id) {
            await updateDocument("Sections", section);
        } else {
            await addDocument("Sections", section);
        }
        handleClose();
        setSection(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setSection(inner);
        setError(inner);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Section</Typography>
                <TextField
                    value={section.title || ""}
                    onChange={handleChange}
                    name='title'
                    label="title"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.title}
                    helperText={error.title}
                />
                <Autocomplete
                    options={movies}
                    getOptionLabel={(option) => option.name}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={getOjectById(movies, section.title)}
                    onChange={(event, value) =>
                        setSection(prev => ({ ...prev, movieId: value?.id || "" }))
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
                <TextField
                    value={section.type || ""}
                    onChange={handleChange}
                    name='type'
                    label="Type"
                    fullWidth
                    rows={2}
                    sx={{ mt: 2 }}
                    error={!!error.type}
                    helperText={error.type}>
                </TextField>

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={addTask} variant="contained">
                        {section?.id ? "Edit" : "Add"}
                    </Button>

                </Box>
            </Box>
        </Modal>
    );
}

export default ModalSection;