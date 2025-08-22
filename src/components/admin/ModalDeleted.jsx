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
        try {
            await deleteDocument("Authors", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Authors:", error.message);
        }
        try {
            await deleteDocument("Actors", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Actors:", error.message);
        }
        try {
            await deleteDocument("Characters", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Characters:", error.message);
        }
        try {
            await deleteDocument("Movies", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Movies:", error.message);
        }
        try {
            await deleteDocument("Packages", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Packages:", error.message);
        }
        try {
            await deleteDocument("Plans", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Plans:", error.message);
        }
        try {
            await deleteDocument("Features", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Features:", error.message);
        }
        try {
            await deleteDocument("Episodes", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Episodes:", error.message);
        }
        try {
            await deleteDocument("Sections", idDeleted);
            handleUpdate();
            handleCloseDel();
        } catch (error) {
            console.warn("Không xoá được ở Sections:", error.message);
        }



    };

    return (
        <div style={{ padding: 20 }}>
            <Dialog open={openDeleted} onClose={handleCloseDel}>
                <DialogTitle>Confirm Delete ?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item? This action cannot be undone.
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