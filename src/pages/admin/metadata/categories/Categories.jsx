import SearchAdmin from '../../../../../src/components/admin/SearchAdmin';
import TableCategory from './TableCategory';
import { useState, useContext } from 'react';
import ModalCategoty from './ModalCategoty';
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
    
    return (
        <div>
            <SearchAdmin title="Categories" buttonText="Category" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableCategory editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} search={search} page={page} setPage={setPage}/>
            <ModalCategoty inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} category={category} setCategory={setCategory} error={error} setError={setError} />
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
        </div>
    );
}

export default Categories;