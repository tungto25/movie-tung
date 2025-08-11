import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoIosSearch } from 'react-icons/io';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50vw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalCategories({ openCate, handleCloseCategories }) {

    return (
        <div>
            <Modal
                open={openCate}
                onClose={handleCloseCategories}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='flex justify-between items-center'>
                        <h1 className='whitespace-nowrap'>Choose Character</h1>
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
                        <div class="flex flex-wrap gap-2">
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Comedy</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Musical</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Action</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Thriller</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Drama</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Superhero</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Science Fiction</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Historical</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Romance</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Family</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Noir</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Fantasy</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Sports</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Adventure</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Epic</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Western</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Documentary</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Horror</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Silent Films</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Mystery</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Crime</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Experimental</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Animation</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">Biographical</span>
                            <span class="border border-green-500 text-green-500 px-3 py-1 rounded text-sm cursor-pointer">War</span>
                        </div>

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
        </div>
    );
}
