import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import axios from 'axios';

export default function ModalDeleted({ openDeleted, handleCloseDel, idDeleted, handleUpdate }) {

    const handleDelete = async () => {
        try {
            await axios.delete(`https://6878a5b463f24f1fdc9ed6fb.mockapi.io/category/${idDeleted}`);
        } catch (error) {
            console.warn("Không xoá được ở Categories:", error.message);
        }


        handleUpdate();
        handleCloseDel();
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