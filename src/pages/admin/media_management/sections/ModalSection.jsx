import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { Autocomplete, Avatar, MenuItem } from '@mui/material';
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
            season: section.season ? "" : "Please enter season",
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
            console.log("vfdvb");

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
        setError({});
    };
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSection(prev => ({ ...prev, imgUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>

                <Typography variant="h6">Modal Add Section</Typography>
                <Autocomplete
                    options={movies}
                    getOptionLabel={(option) => option.name}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={movies.find(m => m.id === section.movieId) || null}
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
                    value={section.season || ""}
                    onChange={handleChange}
                    name='season'
                    label="season"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.season}
                    helperText={error.season}
                />


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