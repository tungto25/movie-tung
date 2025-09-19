import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import { style } from '../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../services/FirebaseService';

function ModalUser({ open, handleClose, account, setAccount, error, setError, inner, handleUpdate }) {
    const validation = () => {
        const newError = {
            name: account.email ? "" : "Please enter email",
            description: account.password ? "" : "Please enter password"
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (account.id) {
            await updateDocument("Accounts", account);
        } else {
            await addDocument("Accounts", account);
        }
        handleClose();
        setAccount(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setAccount(inner);
        setError(inner);
    }
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAccount({ ...account, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Account</Typography>
                <TextField
                    value={account.email || ""}
                    onChange={handleChange}
                    name='email'
                    label="email"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.email}
                    helperText={error.email}
                />
                <TextField
                    value={account.password || ""}
                    onChange={handleChange}
                    name='password'
                    label="password"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!error.password}
                    helperText={error.password}
                />

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={addTask} variant="contained">
                        {account?.id ? "Edit" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalUser;