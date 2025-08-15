import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableMovieTypes from './TableMovieTypes';
import ModalMovieTypes from './ModalMovieTypes';
import { useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';

const inner = { name: "", type: "", description: ""};
function MovieTypes(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [movieType, setMovieType] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const handleSearch = (a) => {
        setSearch(a);
        setPage(1);
    }
    const handleCloseDel = () => {
        setOpenDeleted(false);
        setIdDeleted(null);
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

    return (
        <div>
            <SearchAdmin title="Movie Types" buttonText="MOVIE TYPE" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableMovieTypes editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} search={search} page={page} setPage={setPage} />
            <ModalMovieTypes inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} movieType={movieType} setMovieType={setMovieType} error={error} setError={setError} />
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
        </div>
    );
}

export default MovieTypes;