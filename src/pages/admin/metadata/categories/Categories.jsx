import SearchAdmin from '../../../../../src/components/admin/SearchAdmin';
import TableCategory from './TableCategory';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import ModalCategoty from './ModalCategoty';
import { CategoryContext } from '../../../contexts/CategoryProvider';

const inner = { level: "", price: "", title: "" };
function Categories(props) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");
    const { categories } = useContext(CategoryContext);
    const handleSearch = (a) => {
        const result = categories.filter(e => e.title.toLowerCase().includes(a.toLowerCase()));
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
    useEffect(() => {
        setFilter(categories);
    }, [categories, update])

    return (
        <div>
            <SearchAdmin handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableCategory editOpen={editOpen} filter={filter} />
            <ModalCategoty inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} category={category} setCategory={setCategory} error={error} setError={setError} />
        </div>
    );
}

export default Categories;