import React, { useEffect, useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableMovie from "./TableMovie";
import ModalMovie from './ModalMovie';
import ModalDeleted from '../../../../components/admin/ModalDeleted';

const inner = { name: "", description: "", img: "", author: "", duration: "", plan: "", rent: "" };
function Movies(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [movie, setMovie] = useState(inner);
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
        setMovie(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setMovie(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    return (
        <div>
            <div>
                <SearchAdmin title="Movies" buttonText="MOVIE" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TableMovie editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalMovie inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} movie={movie} setMovie={setMovie} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Movies;