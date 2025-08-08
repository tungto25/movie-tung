import SearchAdmin from '../../../../../src/components/admin/SearchAdmin';
import TableCategory from './TableCategory';
import { useState, useContext } from 'react';
import ModalCategoty from './ModalCategoty';
import { ContextCategories } from '../../../../contexts/CategoryProvider';
import ModalDeleted from '../../../../components/admin/ModalDeleted';

const inner = { name: "", description: "" };
function Categories(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");
    const categories = useContext(ContextCategories);

    const handleCloseDel = () => {
        setOpenDeleted(false);
        setIdDeleted(null);
    }

    const handleSearch = (a) => {
        const result = categories.filter(e => e.name.toLowerCase().includes(a.toLowerCase()));
        setFilter(result);
    }
    const handleOpen = () => {
        setOpen(true);
        setCategory(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setCategory(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    const displayData = search ? filter : categories;
    return (
        <div>
            <SearchAdmin title="Categories" buttonText="Category" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableCategory editOpen={editOpen} displayData={displayData} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} />
            <ModalCategoty inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} category={category} setCategory={setCategory} error={error} setError={setError} />
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
        </div>
    );
}

export default Categories;