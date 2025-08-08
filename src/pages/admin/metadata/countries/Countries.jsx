import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { useContext, useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TableCountry from './TableCountry';
import ModalCountry from './ModalCountry';
import { ContextCountries } from '../../../../contexts/CountryProvider';

const inner = { name: "", createAt: "", region: "" };
function Countries(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [country, setCountry] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");
    const Countries = useContext(ContextCountries);

    const handleCloseDel = () => {
        setOpenDeleted(false);
        setIdDeleted(null);
    }

    const handleSearch = (a) => {
        const result = Countries.filter(e => e.name.toLowerCase().includes(a.toLowerCase()));
        setFilter(result);
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
    const displayData = search ? filter : Countries;

    return (
        <div>
            <SearchAdmin title="Countries" buttonText="COUNTRY" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableCountry editOpen={editOpen} displayData={displayData} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} />
            <ModalCountry inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} country={country} setCountry={setCountry} error={error} setError={setError} />
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
        </div>
    );
}

export default Countries;