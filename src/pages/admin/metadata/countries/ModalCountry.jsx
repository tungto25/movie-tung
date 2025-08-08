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
    useEffect(() => {
        if (open) {
            setError({}); // Reset lỗi mỗi lần mở modal
        }
    }, [open]);

    const validation = () => {
        const newError = {
            name: country.name ? "" : "Please enter name",
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
                    id="outlined-helperText"
                    fullWidth
                    type='date'
                    onChange={handleChange}
                    value={country.createAt || ""}
                    name='createAt'
                    label="Create At"
                    sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    select
                    value={country.region || ""}
                    onChange={handleChange}
                    name='region'
                    label="Region"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.region}
                    helperText={error.region}
                >
                    <MenuItem value="Asia">Asia</MenuItem>
                    <MenuItem value="Europe">Europe</MenuItem>
                    <MenuItem value="Africa">Africa</MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="South America">South America</MenuItem>
                    <MenuItem value="Oceania">Oceania</MenuItem>
                </TextField>

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button onClick={addTask} variant="contained">
                        {country?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalCountry;