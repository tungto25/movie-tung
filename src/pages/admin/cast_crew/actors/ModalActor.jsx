import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { useState } from 'react';
import { Avatar } from '@mui/material';

function ModalActor({ open, handleClose, actor, setActor, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            name: actor.name ? "" : "Please enter name",
            description: actor.description ? "" : "Please enter description"
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setActor(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (actor.id) {
            await updateDocument("Actors", actor);
        } else {
            await addDocument("Actors", actor);
        }
        handleClose();
        setActor(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setActor(inner);
        setError(inner);
    }
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setActor({ ...actor, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Actor</Typography>
                <TextField
                    value={actor.name || ""}
                    onChange={handleChange}
                    name='name'
                    label="Name"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.name}
                    helperText={error.name}
                />
                <TextField
                    value={actor.description || ""}
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

                <label className='flex flex-col items-center rounded-3xl p-1 border-2 mt-4 w-full bg-gray-500 text-white hover:bg-gray-700'>
                    <p className='whitespace-nowrap'>Choosen Image</p>
                    <input
                        type="file"
                        className='hidden'
                        onChange={handleImg}
                    />
                </label>
                <Avatar
                    src={actor?.img}
                    alt="Actor Image"
                    sx={{ width: 150, height: 150, margin: '10px auto' }}
                />

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={addTask} variant="contained">
                        {actor?.id ? "Edit" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalActor;