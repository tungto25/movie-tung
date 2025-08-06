import React, { useEffect, useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalMovie from './ModalMovie';
import TableMovie from './TableMovie';

const inner = { image: "", name: "", decription: "", duration: "", author: "", category: "", entities: "" };
function Movies(props) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [movie, setMovie] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const handleSearch = (a) => {
        const result = data.filter(e => e.title.toLowerCase().includes(a.toLowerCase()));
        setFilter(result);
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
    useEffect(() => {
        setFilter(data);
    }, [movie, update])

    return (
        <div>
            <SearchAdmin />
            <ModalMovie inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} movie={movie} setMovie={setMovie} error={error} setError={setError} />
            <TableMovie editOpen={editOpen} filter={filter} />
        </div>
    );
}

export default Movies;