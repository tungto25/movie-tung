import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { MenuItem } from '@mui/material';

function ModalFeature({ open, handleClose, feature, setFeature, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            plan: feature.plan ? "" : "Please enter plan",
            text: feature.text ? "" : "Please enter text",
            available: feature.available ? "" : "Please enter available",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setFeature(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (feature.id) {
            await updateDocument("Features", feature);
        } else {
            await addDocument("Features", feature);
        }
        handleClose();
        setFeature(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setFeature(inner);
        setError(inner);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Features</Typography>

                <TextField
                    select
                    value={feature.plan || ""}
                    onChange={handleChange}
                    name='plan'
                    label="plan"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.plan}
                    helperText={error.plan}>
                    <MenuItem value="Family">Family</MenuItem>
                    <MenuItem value="Personal">Personal</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                </TextField>

                <TextField
                    value={feature.text || ""}
                    onChange={handleChange}
                    name='text'
                    label="text"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.text}
                    helperText={error.text}
                />
                <TextField
                    value={feature.available || ""}
                    onChange={handleChange}
                    name='available'
                    label="available"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.available}
                    helperText={error.available}
                />

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={addTask} variant="contained">
                        {feature?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalFeature;