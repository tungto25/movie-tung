import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TableAuthor from './TableAuthor';
import ModalAuthor from './ModalAuthor';

const inner = { name: "", description: "", img: "" };
function Authors(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [author, setAuthor] = useState(inner);
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
        setAuthor(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setAuthor(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    return (
        <div>
            <div>
                <SearchAdmin title="Authors" buttonText="AUTHOR" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TableAuthor editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalAuthor inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} author={author} setAuthor={setAuthor} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Authors;