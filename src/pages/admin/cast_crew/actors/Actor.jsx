import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TableActor from './TableActor';
import ModalActor from './ModalActor';

const inner = { name: "", description: "", img: "" };
function Actor(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [actor, setActor] = useState(inner);
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
        setActor(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setActor(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    return (
        <div>
            <div>
                <SearchAdmin title="Actors" buttonText="ACTOR" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TableActor editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalActor inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} actor={actor} setActor={setActor} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Actor;