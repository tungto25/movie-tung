import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { deleteDocument } from '../../services/FirebaseService';

export default function ModalDeleted({ openDeleted, handleCloseDel, idDeleted, handleUpdate }) {

    const handleDelete = async () => {
        try {
            await deleteDocument("Categories", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Categories:", error.message);
        }
        try {
            await deleteDocument("MovieTypes", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở MovieTypes:", error.message);
        }
        try {
            await deleteDocument("Countries", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Countries:", error.message);
        }


    };

    return (
        <div style={{ padding: 20 }}>
            <Dialog open={openDeleted} onClose={handleCloseDel}>
                <DialogTitle>Confirm Delete ?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this {idDeleted} item? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDel}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}