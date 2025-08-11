import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { useState } from 'react';
import { Autocomplete, MenuItem } from '@mui/material';
import { MdCategory } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import ModalCharacter from './ModalCharacter';
import ModalCategories from './ModalCategories';

function ModalMovie({ open, handleClose, movie, setMovie, error, setError, inner, handleUpdate }) {
    const [openCrt, setOpenCrt] = useState(false);
    const handleOpenCharacter = () => setOpenCrt(true);
    const handleCloseCharacter = () => setOpenCrt(false);
    const [openCate, setOpenCate] = useState(false);
    const handleOpenCategories = () => setOpenCate(true);
    const handleCloseCategories = () => setOpenCate(false);

    const validation = () => {
        const newError = {
            name: movie.name ? "" : "Please enter name",
            description: movie.description ? "" : "Please enter description",
            duration: movie.duration ? "" : "Please enter duration",
            author: movie.author ? "" : "Please enter author",
            rent: movie.author ? "" : "Please enter rent",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setMovie(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (movie.id) {
            await updateDocument("Movies", movie);
        } else {
            await addDocument("Movies", movie);
        }
        handleClose();
        setMovie(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setMovie(inner);
        setError(inner);
    }
    const [img, setImg] = useState([])
    const handleImg = () => {

    }
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style} >
                <div className='flex items-center gap-2 '>
                    <div className='border-r pr-5 '>
                        <Typography variant="h6">Modal Add Movie</Typography>
                        <TextField
                            value={movie.name || ""}
                            onChange={handleChange}
                            name='name'
                            label="Name"
                            fullWidth
                            sx={{ mt: 2 }}
                            error={!!error.name}
                            helperText={error.name}
                        />
                        <TextField
                            value={movie.description || ""}
                            onChange={handleChange}
                            name='description'
                            label="Description"
                            fullWidth
                            rows={3}
                            multiline
                            sx={{ mt: 2 }}
                            error={!!error.description}
                            helperText={error.description}
                        />
                        <TextField
                            value={movie.duration || ""}
                            onChange={handleChange}
                            name='duration'
                            label="Duration (Minutes)"
                            fullWidth
                            sx={{ mt: 2 }}
                            error={!!error.duration}
                            helperText={error.duration}
                            type='number'
                        />
                        <Autocomplete
                            options={[]}
                            disablePortal
                            value={movie.author || ""}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mt: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Find the author"
                                    error={!!error.author}
                                    helperText={error.author}
                                />
                            )}
                        />
                        <TextField
                            select
                            value={movie.planid || ""}
                            onChange={handleChange}
                            name='planid'
                            label="Plan Id"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            <MenuItem value="Asia">Family</MenuItem>
                            <MenuItem value="Europe">Personal</MenuItem>
                            <MenuItem value="Europe">Student</MenuItem>
                        </TextField>
                        <TextField
                            value={movie.rent || ""}
                            onChange={handleChange}
                            name='rent'
                            label="Rent"
                            fullWidth
                            sx={{ mt: 2 }}
                            error={!!error.rent}
                            helperText={error.rent}
                        />

                    </div>
                    <div className='p-2'>
                        <div className='flex items-center gap-2 my-2'>
                            <h1>Categories</h1>
                            <MdCategory />
                        </div>
                        <div className='flex items-center gap-2 my-2'>
                            <div className='p-1 border rounded-md flex justify-center items-center transition-transform duration-200 hover:scale-105 shadow-2xl bg-gray-300'>Musical</div>
                            <div className='p-1 border rounded-md flex justify-center items-center transition-transform duration-200 hover:scale-105 shadow-2xl bg-gray-300'>Actions</div>
                            <div className='p-1 border rounded-md flex justify-center items-center transition-transform duration-200 hover:scale-105 shadow-2xl bg-gray-300'>Drama</div>
                            <div className='p-1 border rounded-md flex justify-center items-center transition-transform duration-200 hover:scale-105 shadow-2xl bg-gray-300'>Thriller</div>
                        </div>
                        <div className='flex items-center gap-2 my-2'>
                            <h1>Actor</h1>
                            <FaUserAlt />
                        </div>
                        <div className='flex flex-col items-center gap-1 w-fit rounded-md shadow-2xl mt-4 bg-blue-500 hover:bg-blue-700 cursor-pointer'>
                            <Button onClick={handleOpenCategories}><FaImage className='text-white text-xl' /></Button>
                        </div>

                        <div className='flex items-center gap-2 my-2'>
                            <h1>Character</h1>
                            <FaUserAlt />
                        </div>
                        <div className='flex flex-col items-center gap-1 w-fit rounded-md shadow-2xl mt-4 bg-blue-500 hover:bg-blue-700 cursor-pointer'>
                            <Button onClick={handleOpenCharacter}><FaImage className='text-white text-xl' /></Button>
                        </div>
                    </div>
                </div>
                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={addTask} variant="contained">
                        {movie?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
                <ModalCharacter openCrt={openCrt} handleCloseCharacter={handleCloseCharacter}></ModalCharacter>
                <ModalCategories openCate={openCate} handleCloseCategories={handleCloseCategories}></ModalCategories>
            </Box>
        </Modal>

    );
}

export default ModalMovie;
