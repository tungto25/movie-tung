import SearchAdmin from '../../../components/admin/SearchAdmin';
import TableCategory from '../categories/TableCategory';
import { useEffect, useState } from 'react';
import BasicModal from './ModalCategoty';

const inner = { lever: "", price: "", title: "" };
function Categries(props) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
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
    const getApi = async () => {
        const reponse = await axios.get("https://6878a5b463f24f1fdc9ed6fb.mockapi.io/category");
        setCategories(reponse.data);
    }
    useEffect(() => {
        getApi();
    }, [update]);


    return (
        <div>
            <SearchAdmin handleOpen={handleOpen} />
            <TableCategory open={open} handleClose={handleClose} editOpen={editOpen} />
            <BasicModal inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} category={category} setCategory={setCategory} error={error} setError={setError} />
        </div>
    );
}

export default Categries;