import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from '@mui/material';
import { IoIosSearch } from 'react-icons/io';
import { useState } from 'react';

function ModalChoose({ openChoosen, handleCloseChoosen, dataChoose, modalType }) {
    const [search, setSearch] = useState("");
    const dataSearch = dataChoose.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <Dialog
            open={openChoosen}
            onClose={handleCloseChoosen}
            maxWidth="md"
            fullWidth
        >
            {/* Tiêu đề */}
            <DialogTitle>
                <div className='flex justify-between items-center gap-5 md:gap-15 flex-col md:flex-row'>
                    <h1 className='whitespace-nowrap'>Modal {modalType}</h1>
                    <div className="flex items-center ml-auto rounded-lg shadow-md p-1 border">
                        <IoIosSearch className="px-1 text-3xl text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Enter keyWords..."
                            className="focus:outline-none"
                        />
                    </div>
                </div>
            </DialogTitle>

            {/* Nội dung */}
            <DialogContent dividers>
                <div className='flex flex-wrap gap-3'>
                    {modalType === "categories" &&
                        dataSearch.map((e, idx) => (
                            <h1
                                key={idx}
                                className="border-green-500 text-green-500 px-3 py-1 
                                rounded text-sm cursor-pointer flex items-center p-2 border
                                transition-transform duration-200 hover:scale-105"
                            >
                                {e.name}
                            </h1>
                        ))
                    }
                    {modalType === "actors" &&
                        dataSearch.map((e, idx) => (
                            <div
                                key={idx}
                                className="cursor-pointer rounded-full
                                transition-transform duration-200 hover:scale-105"
                            >
                                <Avatar
                                    src={e.img}
                                    alt="actors Image"
                                    sx={{ width: 50, height: 50, margin: ' auto' }}
                                />
                                <h1>{e.name}</h1>
                            </div>
                        ))
                    }
                    {modalType === "characters" &&
                        dataSearch.map((e, idx) => (
                            <div
                                key={idx}
                                className="cursor-pointer rounded-full
                                transition-transform duration-200 hover:scale-105"
                            >
                                <Avatar
                                    src={e.img}
                                    alt="characters Image"
                                    sx={{ width: 50, height: 50, margin: ' auto' }}
                                />
                                <h1>{e.name}</h1>
                            </div>
                        ))
                    }
                </div>
            </DialogContent>

            {/* Nút bấm */}
            <DialogActions>
                <Button variant="contained">Add</Button>
                <Button onClick={handleCloseChoosen} variant="contained" color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalChoose;
