import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { MenuItem } from '@mui/material';

function ModalPlan({ open, handleClose, plan, setPlan, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            level: plan.level ? "" : "Please enter level",
            price: plan.price ? "" : "Please enter price",
            title: plan.title ? "" : "Please enter title"
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setPlan(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (plan.id) {
            await updateDocument("Plans", plan);
        } else {
            await addDocument("Plans", plan);
        }
        handleClose();
        setPlan(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setPlan(inner);
        setError(inner);
    }
   
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Plans</Typography>
                <TextField
                    value={plan.title || ""}
                    onChange={handleChange}
                    name='title'
                    label="title"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.title}
                    helperText={error.title}>
                </TextField>

                <TextField
                    value={plan.level || ""}
                    onChange={handleChange}
                    name='level'
                    label="level"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.level}
                    helperText={error.level}>
                </TextField>

                <TextField
                    value={plan.price || ""}
                    onChange={handleChange}
                    name='price'
                    label="price"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.price}
                    helperText={error.price}
                    type='number'
                />

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={addTask} variant="contained">
                        {plan?.id ? "Edit" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalPlan;