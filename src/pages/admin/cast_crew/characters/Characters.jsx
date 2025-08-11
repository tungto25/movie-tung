import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TableCharacter from './tableCharacter';
import ModalChatacter from './ModalChatacter';

const inner = { name: "", description: "", img: "" };
function Characters(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [character, setCharacter] = useState(inner);
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
        setCharacter(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setCharacter(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    return (
        <div>
            <div>
                <SearchAdmin title="Characters" buttonText="CHARACTER" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TableCharacter editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalChatacter inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} character={character} setCharacter={setCharacter} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Characters;