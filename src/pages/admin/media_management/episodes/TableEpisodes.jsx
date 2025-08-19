import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useContext } from 'react';
import PaginationTable from '../../../../components/admin/PaginationTable';
import { ContextEpisodes } from '../../../../contexts/EpisodeProvider';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { getOjectById } from '../../../../services/reponsitory';
import { ContextMovies } from '../../../../contexts/MovieProvider';

function TableEpisodes({ editOpen, setIdDeleted, setOpenDeleted, page, setPage, search }) {
    const episodes = useContext(ContextEpisodes);
    const movies = useContext(ContextMovies);

    const rowsPerPage = 5;

    const handleChange = (event, value) => {
        setPage(value);
    };
    const dataSearch = episodes.filter(e => e.title.toLowerCase().includes(search));

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
                            backgroundColor: "gray",
                            "& .MuiTableCell-root": {
                                fontWeight: "bold",
                                color: "white" // nếu muốn chữ trắng
                            }
                        }}>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Episodes Number</TableCell>
                            <TableCell align="right">Movie ID</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                        {paginatedData.map((e, index) => (
                            <TableRow key={e.id}>
                                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                <TableCell align="right">{e.title}</TableCell>
                                <TableCell align="right">{e.description}</TableCell>
                                <TableCell align="right">{e.episodeNumber}</TableCell>
                                <TableCell align="right">{getOjectById(movies, e.movieId)?.name || ""}</TableCell>
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

export default TableEpisodes;