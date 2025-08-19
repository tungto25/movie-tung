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
    Box,
    Avatar,
    Badge,
    IconButton
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
import { getOjectById } from '../../../../services/reponsitory';
import { ContextPlans } from '../../../../contexts/PlanProvider';
import CancelIcon from '@mui/icons-material/Cancel';

function ModalMovie({ open, handleClose, movie, setMovie, error, setError, inner, handleUpdate }) {
    const authors = useContext(ContextAuthors);
    const actors = useContext(ContextActors);
    const categories = useContext(ContextCategories);
    const characters = useContext(ContextCharacters);
    const [dataChoose, setDataChoose] = useState([]);
    const [openChoosen, setOpenChoosen] = useState(false);
    const [modalType, setModalType] = useState("");
    const plans = useContext(ContextPlans);

    const handleOpenChoosen = () => setOpenChoosen(true);
    const handleCloseChoosen = () => setOpenChoosen(false);

    const validation = () => {
        const newError = {
            name: movie.name ? "" : "Please enter name",
            description: movie.description ? "" : "Please enter description",
            duration: movie.duration ? "" : "Please enter duration",
            author: movie.author ? "" : "Please enter author",
            plan: movie.plan ? "" : "Please enter plan",
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

    const handleChoose = (type, item) => {
        switch (type) {
            case "categories":
                setMovie(pre => {
                    return { ...pre, listCate: toggleSelect(pre.listCate, item) }
                })
                break;
            case "actors":
                setMovie(pre => {
                    return { ...pre, listActor: toggleSelect(pre.listActor, item) }
                })
                break;
            case "characters":
                setMovie(pre => {
                    return { ...pre, listCharacter: toggleSelect(pre.listCharacter, item) }
                })
                break;
        }
    }

    const toggleSelect = (items, id) => {
        return items.includes(id) ? items.filter(e => e !== id) : [...items, id];

    }
    const selectPlans = plans.find(e => e.id == movie.plan)

    const getDataChoose = () => {
        switch (modalType) {
            case "categories":
                return movie.listCate;
            case "actors":
                return movie.listActor;
            case "characters":
                return movie.listCharacter;
        }
    }
    const handleImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMovie({ ...movie, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }
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
                    <div className='flex items-center gap-2 flex-col md:flex-row '>
                        {/* Cột trái */}
                        <div className='md:border-r md:pr-5 w-full mb-auto'>
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
                                value={getOjectById(authors, movie.author)}
                                onChange={(event, value) =>
                                    setMovie(prev => ({ ...prev, author: value?.id || "" }))
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
                            <Autocomplete
                                options={plans}
                                getOptionLabel={(option) => option.title}
                                disablePortal
                                fullWidth
                                sx={{ mt: 2 }}
                                value={getOjectById(plans, movie.plan)}
                                onChange={(event, value) =>
                                    setMovie(prev => ({ ...prev, plan: value?.id || "" }))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Find the plan"
                                        error={!!error.plan}
                                        helperText={error.plan}
                                    />
                                )}
                            />
                            {selectPlans?.level > 1 &&
                                (<TextField
                                    value={movie.rent || ""}
                                    onChange={handleChange}
                                    name='rent'
                                    label="Rent"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    error={!!error.rent}
                                    helperText={error.rent}
                                />)}

                        </div>

                        {/* Cột phải */}
                        <div className='p-2 mb-auto w-full'>
                            {/* Categories */}
                            <div className='flex items-center gap-2 my-2'>
                                <h1>Categories</h1>
                                <div
                                    onClick={() => openChoose("categories")}
                                    className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300
                                     hover:bg-gray-700 hover:scale-110'
                                >
                                    <MdCategory />
                                </div>
                            </div>
                            <div className='flex items-center gap-2 my-2 flex-wrap mt-4'>
                                {movie.listCate.map((e) => (
                                    <Badge
                                        key={e.id}
                                        overlap="rectangular"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}

                                        sx={{
                                            '& .MuiBadge-badge': {
                                                transform: 'translate(50%, -50%)',
                                                backgroundColor: 'transparent',
                                                color: 'white',
                                                borderRadius: '50%',
                                                height: 20,
                                                minWidth: 20,
                                            },
                                            textAlign: "center"
                                        }}
                                        badgeContent={
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    bgcolor: 'white',
                                                    p: 0,
                                                    boxShadow: 1,
                                                    '&:hover': { bgcolor: 'grey.200' },
                                                    color: "red",
                                                    scale: 1.2
                                                }}
                                            >
                                                <CancelIcon onClick={() => handleChoose("categories", e)} fontSize="inherit" />
                                            </IconButton>

                                        }
                                    >
                                        <div className='px-2 py-1 border rounded-md shadow-2xl bg-gray-300 hover:scale-105 transition-transform'>
                                            {getOjectById(categories, e)?.name}
                                        </div>
                                    </Badge>))}

                            </div>

                            {/* Actors */}
                            <div className='flex items-center gap-2 my-2'>
                                <h1>Actors</h1>
                                <div
                                    onClick={() => openChoose("actors")}
                                    className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300
                                     hover:bg-gray-700 hover:scale-110'
                                >
                                    <FaUserAlt />
                                </div>
                            </div>

                            <div className='flex items-center gap-2 my-2 flex-wrap'>
                                {movie.listActor.map((e, idx) => (
                                    <div
                                        onClick={() => handleSelected(e)}
                                        key={idx}
                                        className="cursor-pointer rounded-full
                                transition-transform duration-200 hover:scale-105
                                flex flex-col items-center"

                                    >
                                        <Badge
                                            color="secondary"
                                            overlap="circular"
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    backgroundColor: 'transparent',
                                                    boxShadow: 'none',
                                                    padding: 0,
                                                },
                                                textAlign: "center"
                                            }}
                                            badgeContent={
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'white',
                                                        p: 0,
                                                        boxShadow: 1,
                                                        '&:hover': { bgcolor: 'grey.200' },
                                                        color: "red",
                                                        scale: 1.2
                                                    }}
                                                >
                                                    <CancelIcon onClick={() => handleChoose("actors", e)} fontSize="inherit" />
                                                </IconButton>
                                            }
                                        >
                                            <Avatar
                                                src={getOjectById(actors, e)?.img}
                                                alt="author Image"
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    margin: 'auto',
                                                }}
                                            />
                                        </Badge>

                                        <h1 className='text-center '>{e.name}</h1>
                                    </div>
                                ))}

                            </div>

                            {/* Characters */}
                            <div className='flex items-center gap-2 my-2'>
                                <h1>Character</h1>
                                <div
                                    onClick={() => openChoose("characters")}
                                    className='bg-gray-500 text-white py-2 px-4 rounded-md transition-transform duration-300
                                     hover:bg-gray-700 hover:scale-110'
                                >
                                    <FaUserAlt />
                                </div>
                            </div>

                            {/* Upload character image */}
                            <div className='flex items-center gap-2 my-2 flex-wrap'>
                                {movie.listCharacter.map((e, idx) => (
                                    <div
                                        onClick={() => handleSelected(e)}
                                        key={idx}
                                        className="cursor-pointer rounded-full
                                transition-transform duration-200 hover:scale-105
                                flex flex-col items-center"

                                    >
                                        <Badge
                                            color="secondary"
                                            overlap="circular"
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    backgroundColor: 'transparent',
                                                    boxShadow: 'none',
                                                    padding: 0,
                                                },
                                                textAlign: "center"
                                            }}
                                            badgeContent={
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'white',
                                                        p: 0,
                                                        boxShadow: 1,
                                                        '&:hover': { bgcolor: 'grey.200' },
                                                        color: "red",
                                                        scale: 1.2
                                                    }}
                                                >
                                                    <CancelIcon onClick={() => handleChoose("characters", e)} fontSize="inherit" />
                                                </IconButton>
                                            }
                                        >

                                            <Avatar
                                                src={getOjectById(characters, e)?.img}
                                                alt="author Image"
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    margin: '10px auto',
                                                }}
                                            />
                                        </Badge>

                                        <h1 className='text-center '>{e.name}</h1>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label className='flex flex-col items-center rounded-3xl p-1 border-2 mt-4 w-full bg-gray-500 text-white hover:bg-gray-700'>
                                    <p className='whitespace-nowrap'>Choosen Image</p>
                                    <input
                                        type="file"
                                        className='hidden'
                                        onChange={handleImg}
                                    />
                                </label>
                                <Avatar
                                    src={movie?.imgUrl}
                                    alt="Actor Image"
                                    sx={{ width: 150, height: 150, margin: '10px auto' }}
                                />
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
                handleChoose={handleChoose}
                modalType={modalType}
                dataChoose={dataChoose}
                openChoosen={openChoosen}
                handleCloseChoosen={handleCloseChoosen}
                getChoose={getDataChoose()}
            />
        </>
    );
}

export default ModalMovie;
