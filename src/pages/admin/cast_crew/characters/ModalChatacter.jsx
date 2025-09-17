import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { useState } from 'react';
import { Avatar } from '@mui/material';

function ModalChatacter({ open, handleClose, character, setCharacter, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            name: character.name ? "" : "Please enter name",
            description: character.description ? "" : "Please enter description"
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setCharacter(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (character.id) {
            await updateDocument("Characters", character);
        } else {
            await addDocument("Characters", character);
        }
        handleClose();
        setCharacter(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setCharacter(inner);
        setError(inner);
    }
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCharacter(prev => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setCharacter(prev => ({ ...prev, img: "" }));
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Character</Typography>
                <TextField
                    value={character.name || ""}
                    onChange={handleChange}
                    name='name'
                    label="Name"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.name}
                    helperText={error.name}
                />
                <TextField
                    value={character.description || ""}
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
                    value={character.imgUrl || ""}
                    onChange={handleChange}
                    name='imgUrl'
                    label="imgUrl"
                    fullWidth
                    multiline
                    sx={{ mt: 2 }}
                    error={!!error.imgUrl}
                    helperText={error.imgUrl}
                />

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={addTask} variant="contained">
                        {character?.id ? "Edit" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalChatacter;