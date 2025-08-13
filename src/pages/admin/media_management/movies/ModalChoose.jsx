import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import { IoIosSearch } from 'react-icons/io';
import { style, style1, style2 } from '../../../../untils/styleContants';
import { useState } from 'react';

function ModalChoose({ openChoosen, handleCloseChoosen, dataChoose, modalType }) {
    const [search, setSearch] = useState("");
    const dataSearch = dataChoose.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <Modal
            open={openChoosen}
            onClose={handleCloseChoosen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style2}>
                <Typography id="modal-modal-title" variant="h6" component="h2" className='flex justify-between items-center gap-5 md:gap-15 flex-col md:flex-row'>
                    <h1 className='whitespace-nowrap'>Modal {modalType}</h1>
                    <div className="flex items-center ml-auto rounded-lg shadow-md p-1 border">
                        <IoIosSearch className="px-1 text-3xl text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Enter keyWords..."
                            className=" focus:outline-none"
                        />
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                    <div className='flex flex-wrap gap-3'>
                        {modalType == "categories" &&
                            dataSearch.map((e) => (
                                <h1 className="border-green-500 text-green-500 px-3 py-1 
                            rounded text-sm cursor-pointer flex items-center p-2 border
                            transition-transform duration-200 hover:scale-105 ">{e.name}</h1>
                            ))
                        }
                        {modalType == "actors" &&
                            dataSearch.map((e) => (
                                <div className="cursor-pointer rounded-full
                            transition-transform duration-200 hover:scale-105 ">
                                    <Avatar
                                        src={e.img}
                                        alt="actors Image"
                                        sx={{ width: 50, height: 50, margin: ' auto' }}
                                    />
                                    <h1>{e.name}</h1>
                                </div>
                            ))
                        }
                        {modalType == "characters" &&
                            dataSearch.map((e) => (
                                <div className="cursor-pointer rounded-full
                            transition-transform duration-200 hover:scale-105 ">
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
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button variant="contained">
                        Add
                    </Button>
                    <Button onClick={handleCloseChoosen} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalChoose;