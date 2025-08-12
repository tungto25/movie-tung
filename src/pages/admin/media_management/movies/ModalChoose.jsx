import { Box, Button, Modal, Typography } from '@mui/material';
import { IoIosSearch } from 'react-icons/io';
import { style, style1 } from '../../../../untils/styleContants';

function ModalChoose({openChoosen,handleCloseChoosen, dataChoose}) {
    console.log(dataChoose);
    return (
        <Modal
                open={openChoosen}
                onClose={handleCloseChoosen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='flex justify-between items-center'>
                        <h1 className='whitespace-nowrap'>Modal Choosen</h1>
                        <div className="flex items-center max-w-md mx-auto  rounded-lg shadow-md p-2 border">
                            <IoIosSearch className="px-1 text-3xl text-gray-400" />
                            <input
                                value={[]}
                                type="text"
                                placeholder="Enter keyWords..."
                                className="w-full focus:outline-none"
                            />
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 5 }}>

                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                        <Button variant="contained">
                            Add
                        </Button>
                        <Button variant="contained" color="error">
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
    );
}

export default ModalChoose;