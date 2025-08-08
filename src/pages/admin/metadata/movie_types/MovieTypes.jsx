import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableMovieTypes from './TableMovieTypes';
import ModalMovieTypes from './ModalMovieTypes';
import { useContext, useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { ContextMovieTypes } from '../../../../contexts/MovieTypeProvider';

const inner = { name: "", description: "", createAt: "" };
function MovieTypes(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [movieType, setMovieType] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");
    const movieTypes = useContext(ContextMovieTypes);

    const handleCloseDel = () => {
        setOpenDeleted(false);
        setIdDeleted(null);
    }

    const handleSearch = (a) => {
        const result = movieTypes.filter(e => e.name.toLowerCase().includes(a.toLowerCase()));
        setFilter(result);
    }
    const handleOpen = () => {
        setOpen(true);
        setMovieType(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setMovieType(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    const displayData = search ? filter : movieTypes;

    return (
        <div>
            <SearchAdmin title="Movie Types" buttonText="MOVIE TYPE" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableMovieTypes editOpen={editOpen} displayData={displayData} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} />
            <ModalMovieTypes inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} movieType={movieType} setMovieType={setMovieType} error={error} setError={setError} />
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
        </div>
    );
}

export default MovieTypes;