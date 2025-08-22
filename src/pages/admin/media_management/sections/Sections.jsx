import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { useContext, useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TableSection from './TableSection';
import ModalSection from './ModalSection';
import { ContextMovies } from '../../../../contexts/MovieProvider';

const inner = { title: "", imgUrl: "", movieId: "" };
function Sections(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [section, setSection] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const movies = useContext(ContextMovies);
    console.log(movies);
    
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
        setSection(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setSection(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }

    return (
        <div>
            <SearchAdmin title="Section" buttonText="SECTION" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableSection movies={movies} editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} search={search} page={page} setPage={setPage} />
            <ModalSection movies={movies} inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} section={section} setSection={setSection} error={error} setError={setError} />
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
        </div>
    );
}

export default Sections;