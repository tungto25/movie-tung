import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { Autocomplete} from '@mui/material';
import { ContextPlans } from '../../../../contexts/PlanProvider';
import { useContext } from 'react';
import { getOjectById } from '../../../../services/reponsitory';

function ModalPackage({ open, handleClose, packageData, setpackageData, error, setError, inner, handleUpdate }) {
    const plans = useContext(ContextPlans);
    
    const validation = () => {
        const newError = {
            discount: packageData.discount ? "" : "Please enter discount",
            plan: packageData.plan ? "" : "Please enter plan",
            time: packageData.time ? "" : "Please enter time",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setpackageData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (packageData.id) {
            await updateDocument("Packages", packageData);
        } else {
            await addDocument("Packages", packageData);
        }
        handleClose();
        setpackageData(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setpackageData(inner);
        setError(inner);
    }
    
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Package</Typography>
                <TextField
                    value={packageData.discount || ""}
                    onChange={handleChange}
                    name='discount'
                    label="Discount"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.discount}
                    helperText={error.discount}
                    type='number'
                />
                <Autocomplete
                    options={plans}
                    getOptionLabel={(option) => option.title}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={getOjectById(plans,packageData.plan)}
                    onChange={(event, value) =>
                        setpackageData(prev => ({ ...prev, plan: value?.id || "" }))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Find the plan"
                            error={!!error.plan}
                            helperText={error.plan}
                        />
                    )}
                />

                <TextField
                    value={packageData.time || ""}
                    onChange={handleChange}
                    name='time'
                    label="Time"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.time}
                    helperText={error.time}
                    type='number'
                />


                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={addTask} variant="contained">
                        {packageData?.id ? "Edit" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalPackage;