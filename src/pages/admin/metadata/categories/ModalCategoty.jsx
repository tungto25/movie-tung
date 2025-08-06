import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
};

export default function ModalCategoty({ open, handleClose, category, setCategory, error, setError, inner, handleUpdate }) {

    useEffect(() => {
        if (open) {
            setError({}); // Reset lỗi mỗi lần mở modal
        }
    }, [open]);

    const validation = () => {
        const newError = {
            level: category.level ? "" : "Please enter level",
            price: category.price ? "" : "Please enter price",
            title: category.title ? "" : "Please enter title"
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
            await axios.put(`https://6878a5b463f24f1fdc9ed6fb.mockapi.io/category/${category.id}`, category);
        } else {
            await axios.post("https://6878a5b463f24f1fdc9ed6fb.mockapi.io/category", category);
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
    console.log(category);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6">Please enter information</Typography>
                <TextField
                    value={category.level || ""}
                    type='number'
                    onChange={handleChange}
                    name='level'
                    label="level"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.level}
                    helperText={error.level}
                />
                <TextField
                    value={category.price || ""}
                    onChange={handleChange}
                    name='price'
                    label="Price Per Month"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.price}
                    helperText={error.price}
                />
                <TextField
                    value={category.title || ""}
                    onChange={handleChange}
                    name='title'
                    label="Title"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.title}
                    helperText={error.title}
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
