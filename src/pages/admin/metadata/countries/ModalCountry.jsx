import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { MenuItem } from '@mui/material';

function ModalCountry({ open, handleClose, country, setCountry, error, setError, inner, handleUpdate }) {

    const validation = () => {
        const newError = {
            name: country.name ? "" : "Please enter name",
            description: country.description ? "" : "Please enter description"
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setCountry(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (country.id) {
            await updateDocument("Countries", country);
        } else {
            await addDocument("Countries", country);
        }
        handleClose();
        setCountry(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setCountry(inner);
        setError(inner);
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Country</Typography>
                <TextField
                    value={country.name || ""}
                    onChange={handleChange}
                    name='name'
                    label="Name"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.name}
                    helperText={error.name}
                />
                <TextField
                    value={country.description || ""}
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
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={addTask} variant="contained">
                        {country?.id ? "Edit" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalCountry;