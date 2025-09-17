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
        title: section.title ? "" : "Please enter title",
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
                
                <div>
                    <label className='flex flex-col items-center rounded-3xl p-1 border-2 mt-4 w-full bg-gray-500 text-white hover:bg-gray-700'>
                        <p className='whitespace-nowrap'>Choosen Image</p>
                        <input
                            type="file"
                            className='hidden'
                            onChange={handleImg}
                        />
                    </label>
                    <Avatar
                        src={section?.imgUrl}
                        alt="Image"
                        sx={{ width: 150, height: 150, margin: '10px auto' }}
                    />
                </div>
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