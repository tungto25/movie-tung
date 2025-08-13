import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { MenuItem } from '@mui/material';

function ModalPackage({ open, handleClose, packageData, setpackageData, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            discount: packageData.discount ? "" : "Please enter discount",
            plan: packageData.plan ? "" : "Please enter plan",
            time: packageData.time ? "" : "Please enter time",
            coupon: packageData.coupon ? "" : "Please enter coupon",
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
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setpackageData({ ...packageData, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
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
                    label="discount"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.discount}
                    helperText={error.discount}
                />
                <TextField
                    select
                    value={packageData.plan || ""}
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
                    value={packageData.time || ""}
                    onChange={handleChange}
                    name='time'
                    label="time"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.time}
                    helperText={error.time}
                    type='number'
                />
                <TextField
                    value={packageData.coupon || ""}
                    onChange={handleChange}
                    name='coupon'
                    label="coupon"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.coupon}
                    helperText={error.coupon}
                />


                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={addTask} variant="contained">
                        {packageData?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalPackage;