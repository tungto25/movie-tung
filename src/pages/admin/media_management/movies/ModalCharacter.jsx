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
const characters = [
    { name: 'Vincent Vega', img: '' },
    { name: 'Spider-Man (Peter Parker)', img: '' },
    { name: 'Mia Wallace', img: '' },
    { name: 'Sherlock Holmes', img: '' },
    { name: 'Harry Potter', img: '' },
    { name: 'Batman (Bruce Wayne)', img: '' },
    { name: 'Andy Dufresne', img: '' },
    { name: 'Ellis Redding', img: '' },
    { name: 'Darth Vader', img: '' },
];
export default function ModalCharacter({ openCrt, handleCloseCharacter }) {

    return (
        <div>
            <Modal
                open={openCrt}
                onClose={handleCloseCharacter}
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
                        <div className="flex flex-wrap gap-6 justify-start max-w-xl ">
                            {characters.map((char) => (
                                <div key={char.name} className="flex flex-col items-center w-20 gap-5">
                                    <img
                                        src={char.img}
                                        className="w-20 h-20 rounded-full object-cover bg-amber-500"
                                    />
                                    <p className="text-center text-sm mt-2 ">{char.name}</p>
                                </div>
                            ))}
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
