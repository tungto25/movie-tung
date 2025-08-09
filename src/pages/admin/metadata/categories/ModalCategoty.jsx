import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';

export default function ModalCategoty({ open, handleClose, category, setCategory, error, setError, inner, handleUpdate }) {

    const validation = () => {
        const newError = {
            name: category.name ? "" : "Please enter name",
            description: category.description ? "" : "Please enter description",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setCategory(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (category.id) {
            await updateDocument("Categories", category);
        } else {
            await addDocument("Categories", category);
        }
        handleClose();
        setCategory(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setCategory(inner);
        setError(inner);
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Category</Typography>
                <TextField
                    value={category.name || ""}
                    onChange={handleChange}
                    name='name'
                    label="Name"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.name}
                    helperText={error.name}
                />
                <TextField
                    value={category.description || ""}
                    onChange={handleChange}
                    name='description'
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                    error={!!error.description}
                    helperText={error.description}
                />

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button onClick={addTask} variant="contained">
                        {category?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
