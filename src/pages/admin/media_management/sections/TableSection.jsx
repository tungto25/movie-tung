import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useContext } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import PaginationTable from '../../../../components/admin/PaginationTable';
import { ContextSections } from '../../../../contexts/SectionProvider';
import { getOjectById } from '../../../../services/reponsitory';

function TableSection({ editOpen, setIdDeleted, setOpenDeleted, search, page, setPage, movies }) {

    const sections = useContext(ContextSections);
    const dataSearch = sections.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
    const rowsPerPage = 5;

    const handleChange = (event, value) => {
        setPage(value);
    };


    const paginatedData = dataSearch.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );
    const showModalDeleted = (id) => {
        setOpenDeleted(true);
        setIdDeleted(id);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        <TableRow sx={{
                            backgroundColor: "rgba(3, 7, 18, 0.8)",
                            "& .MuiTableCell-root": {
                                fontWeight: "bold",
                                color: "white" // nếu muốn chữ trắng
                            }
                        }}>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Movie</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                        {paginatedData.map((e, index) => (
                            <TableRow key={e.id}
                                sx={{
                                    background: "rgba(31, 41, 55, 0.8)",
                                    "& .MuiTableCell-root": {
                                        color: "white" // nếu muốn chữ trắng
                                    }
                                }}>
                                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                <TableCell align="right">{e.imgUrl}</TableCell>
                                <TableCell align="right">{e.title}</TableCell>
                                <TableCell align="right">{getOjectById(movies, e.movieId)?.name}</TableCell>
                                
                                <TableCell >
                                    <div className='flex gap-2 justify-center items-center'>
                                        <button onClick={() => editOpen(e)} className='bg-blue-600 p-2 rounded-md text-white'><MdEdit /></button>
                                        <button onClick={() => showModalDeleted(e.id)} className='bg-red-600 p-2 rounded-md text-white'><MdDeleteForever /></button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationTable data={dataSearch} handleChange={handleChange} page={page} rowsPerPage={rowsPerPage} />
        </>


    );
}

export default TableSection;