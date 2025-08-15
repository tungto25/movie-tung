import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';

function ModalAuthor({ open, handleClose, author, setAuthor, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            name: author.name ? "" : "Please enter name",
            description: author.description ? "" : "Please enter description"
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setAuthor(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (author.id) {
            await updateDocument("Authors", author);
        } else {
            await addDocument("Authors", author);
        }
        handleClose();
        setAuthor(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setAuthor(inner);
        setError(inner);
    }
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAuthor({ ...author, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Author</Typography>
                <TextField
                    value={author.name || ""}
                    onChange={handleChange}
                    name='name'
                    label="Name"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.name}
                    helperText={error.name}
                />
                <TextField
                    value={author.description || ""}
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

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={addTask} variant="contained">
                        {author?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalAuthor;