import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style, style1 } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { useContext, useState } from 'react';
import { Autocomplete, MenuItem } from '@mui/material';
import { MdCategory } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import ModalCharacter from './ModalCharacter';
import ModalCategories from './ModalCategories';
import { ContextAuthors } from '../../../../contexts/AuthorProvider';
import { ContextCategories } from '../../../../contexts/CategoryProvider';
import { ContextActors } from '../../../../contexts/ActorProvider';
import { ContextCharacters } from '../../../../contexts/CharacterProvider';
import ModalChoose from './ModalChoose';

function ModalMovie({ open, handleClose, movie, setMovie, error, setError, inner, handleUpdate }) {
    const [openCrt, setOpenCrt] = useState(false);
    const handleOpenCharacter = () => setOpenCrt(true);
    const handleCloseCharacter = () => setOpenCrt(false);
    const [openCate, setOpenCate] = useState(false);
    const handleOpenCategories = () => setOpenCate(true);
    const handleCloseCategories = () => setOpenCate(false);
    const authors = useContext(ContextAuthors);
    const actors = useContext(ContextActors);
    const categories = useContext(ContextCategories);
    const characters = useContext(ContextCharacters);
    const [dataChoose, setDataChoose] = useState([]);
    const [openChoosen, setOpenChoosen] = useState(false);
    const handleOpenChoosen = () => setOpenChoosen(true);
    const handleCloseChoosen = () => setOpenChoosen(false);
    const [modalType, setModalType] = useState("");
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

    const openChoose = (type) => {
        switch (type) {
            case "categories":
                setDataChoose(categories);
                break;
            case "actors":
                setDataChoose(actors);
                break;
            case "characters":
                setDataChoose(characters);
                break;
        }
        handleOpenChoosen();
        setModalType(type);
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style1} >
                <div className='flex items-center gap-2 flex-col md:flex-row'>
                    <div className='md:border-r md:pr-5 '>
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
                            options={authors}
                            getOptionLabel={(option) => option.name} // Hiển thị tên của tác giả
                            disablePortal
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
                            value={movie.plan || ""}
                            onChange={handleChange}
                            name='plan'
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
                    <div className='p-2 mb-auto'>
                        <div className='flex items-center gap-2 my-2'>
                            <h1>Categories</h1>
                            <div onClick={() => openChoose("categories")} className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-gray-700 hover:scale-110'>
                                <MdCategory />
                            </div>

                        </div>
                        <div className='flex items-center gap-2 my-2'>
                            <div className='p-1 border rounded-md flex justify-center items-center transition-transform duration-200 hover:scale-105 shadow-2xl bg-gray-300'>Musical</div>
                            <div className='p-1 border rounded-md flex justify-center items-center transition-transform duration-200 hover:scale-105 shadow-2xl bg-gray-300'>Actions</div>
                            <div className='p-1 border rounded-md flex justify-center items-center transition-transform duration-200 hover:scale-105 shadow-2xl bg-gray-300'>Drama</div>
                            <div className='p-1 border rounded-md flex justify-center items-center transition-transform duration-200 hover:scale-105 shadow-2xl bg-gray-300'>Thriller</div>
                        </div>
                        <div className='flex items-center gap-2 my-2'>
                            <h1>Actors</h1>
                            <div onClick={() => openChoose("actors")} className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-gray-700 hover:scale-110'>
                                <FaUserAlt />
                            </div>

                        </div>
                        <div className='flex flex-col items-center gap-1 w-fit rounded-md shadow-2xl mt-4 bg-blue-500 hover:bg-blue-700 cursor-pointer'>
                            <Button ><FaImage className='text-white text-xl' /></Button>
                        </div>

                        <div className='flex items-center gap-2 my-2'>
                            <h1>Character</h1>
                            <div onClick={() => openChoose("characters")} className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-gray-700 hover:scale-110'>
                                <FaUserAlt />
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-1 w-fit rounded-md shadow-2xl mt-4 bg-blue-500 hover:bg-blue-700 cursor-pointer'>
                            <Button ><FaImage className='text-white text-xl' /></Button>
                        </div>
                    </div>
                </div>
                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end", }}>
                    <Button onClick={addTask} variant="contained">
                        {movie?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
                <ModalChoose modalType={modalType} dataChoose={dataChoose} openChoosen={openChoosen} handleCloseChoosen={handleCloseChoosen}></ModalChoose>
            </Box>
        </Modal>

    );
}

export default ModalMovie;
