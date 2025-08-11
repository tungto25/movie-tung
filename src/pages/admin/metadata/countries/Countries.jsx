import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { useContext, useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TableCountry from './TableCountry';
import ModalCountry from './ModalCountry';
import { ContextCountries } from '../../../../contexts/CountryProvider';

const inner = { name: "", description: "", region: "" };
function Countries(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [country, setCountry] = useState(inner);
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
        setCountry(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setCountry(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }

    return (
        <div>
            <SearchAdmin title="Countries" buttonText="COUNTRY" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableCountry editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search}/>
            <ModalCountry inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} country={country} setCountry={setCountry} error={error} setError={setError} />
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
        </div>
    );
}

export default Countries;