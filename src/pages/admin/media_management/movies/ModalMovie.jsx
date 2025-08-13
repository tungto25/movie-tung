import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    MenuItem,
    Autocomplete,
    Box
} from '@mui/material';
import { MdCategory } from "react-icons/md";
import { FaUserAlt, FaImage } from "react-icons/fa";
import { useContext, useState } from 'react';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { ContextAuthors } from '../../../../contexts/AuthorProvider';
import { ContextCategories } from '../../../../contexts/CategoryProvider';
import { ContextActors } from '../../../../contexts/ActorProvider';
import { ContextCharacters } from '../../../../contexts/CharacterProvider';
import ModalChoose from './ModalChoose';

function ModalMovie({ open, handleClose, movie, setMovie, error, setError, inner, handleUpdate }) {
    const authors = useContext(ContextAuthors);
    const actors = useContext(ContextActors);
    const categories = useContext(ContextCategories);
    const characters = useContext(ContextCharacters);

    const [dataChoose, setDataChoose] = useState([]);
    const [openChoosen, setOpenChoosen] = useState(false);
    const [modalType, setModalType] = useState("");

    const handleOpenChoosen = () => setOpenChoosen(true);
    const handleCloseChoosen = () => setOpenChoosen(false);

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
        if (!validation()) return;

        if (movie.id) {
            await updateDocument("Movies", movie);
        } else {
            await addDocument("Movies", movie);
        }
        handleClose();
        setMovie(inner);
        handleUpdate();
    };

    const Cancel = () => {
        handleClose();
        setMovie(inner);
        setError(inner);
    };

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
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6">Modal Add Movie</Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <div className='flex items-center gap-2 flex-col md:flex-row'>
                        {/* Cột trái */}
                        <div className='md:border-r md:pr-5 w-full'>
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
                                getOptionLabel={(option) => option.name}
                                disablePortal
                                fullWidth
                                sx={{ mt: 2 }}
                                onChange={(event, value) =>
                                    setMovie(prev => ({ ...prev, author: value?.name || "" }))
                                }
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
                                <MenuItem value="Family">Family</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Student">Student</MenuItem>
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

                        {/* Cột phải */}
                        <div className='p-2 mb-auto w-full'>
                            {/* Categories */}
                            <div className='flex items-center gap-2 my-2'>
                                <h1>Categories</h1>
                                <div
                                    onClick={() => openChoose("categories")}
                                    className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-gray-700 hover:scale-110'
                                >
                                    <MdCategory />
                                </div>
                            </div>

                            <div className='flex items-center gap-2 my-2 flex-wrap'>
                                <div className='p-1 border rounded-md shadow-2xl bg-gray-300 hover:scale-105 transition-transform'>Musical</div>
                                <div className='p-1 border rounded-md shadow-2xl bg-gray-300 hover:scale-105 transition-transform'>Actions</div>
                                <div className='p-1 border rounded-md shadow-2xl bg-gray-300 hover:scale-105 transition-transform'>Drama</div>
                                <div className='p-1 border rounded-md shadow-2xl bg-gray-300 hover:scale-105 transition-transform'>Thriller</div>
                            </div>

                            {/* Actors */}
                            <div className='flex items-center gap-2 my-2'>
                                <h1>Actors</h1>
                                <div
                                    onClick={() => openChoose("actors")}
                                    className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-gray-700 hover:scale-110'
                                >
                                    <FaUserAlt />
                                </div>
                            </div>

                            {/* Upload actor image */}
                            <div className='flex flex-col items-center gap-1 w-fit rounded-md shadow-2xl mt-4 bg-blue-500 hover:bg-blue-700 cursor-pointer'>
                                <Button><FaImage className='text-white text-xl' /></Button>
                            </div>

                            {/* Characters */}
                            <div className='flex items-center gap-2 my-2'>
                                <h1>Character</h1>
                                <div
                                    onClick={() => openChoose("characters")}
                                    className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-gray-700 hover:scale-110'
                                >
                                    <FaUserAlt />
                                </div>
                            </div>

                            {/* Upload character image */}
                            <div className='flex flex-col items-center gap-1 w-fit rounded-md shadow-2xl mt-4 bg-blue-500 hover:bg-blue-700 cursor-pointer'>
                                <Button><FaImage className='text-white text-xl' /></Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={addTask} variant="contained">
                        {movie?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal choose category/actor/character */}
            <ModalChoose
                modalType={modalType}
                dataChoose={dataChoose}
                openChoosen={openChoosen}
                handleCloseChoosen={handleCloseChoosen}
            />
        </>
    );
}

export default ModalMovie;
