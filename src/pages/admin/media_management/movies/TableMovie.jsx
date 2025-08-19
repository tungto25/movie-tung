import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useContext, useState } from 'react';
import PaginationTable from '../../../../components/admin/PaginationTable';
import { ContextMovies } from '../../../../contexts/MovieProvider';
import { BiSolidCategory } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";


function TableMovie({ editOpen, setIdDeleted, setOpenDeleted, page, setPage, search }) {
    const Movies = useContext(ContextMovies);

    const rowsPerPage = 5;

    const handleChange = (event, value) => {
        setPage(value);
    };
    const dataSearch = Movies.filter(e => e.name.toLowerCase().includes(search));

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
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Duration</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align='center'>Categories</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align='center'>Entities</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                        {paginatedData.map((e, index) => (
                            <TableRow key={e.id} sx={{
                                background: "rgba(31, 41, 55, 0.8)",
                                "& .MuiTableCell-root": {
                                    color: "white" // nếu muốn chữ trắng
                                }
                            }}>
                                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                <TableCell align="center" sx={{ width: "15px", height: "15px" }}>
                                    <Avatar
                                        src={e.imgUrl}
                                        alt="movie Image"
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            margin: 'auto',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">{e.name}</TableCell>
                                <TableCell align="center">{e.duration}</TableCell>
                                <TableCell align="center">{e.author}</TableCell>
                                <TableCell align="center">{e.description}</TableCell>
                                <TableCell align='center'>
                                    <button className='m-auto bg-purple-600 py-2 rounded-md text-white px-8 shadow-xl transition-transform duration-200 hover:scale-110'><BiSolidCategory /></button>
                                </TableCell>
                                <TableCell align='center'>
                                    <button className='m-auto bg-yellow-600 py-2 rounded-md text-white px-8 shadow-xl transition-transform duration-200 hover:scale-110'><FaUserLarge /></button>
                                </TableCell>
                                <TableCell >
                                    <div className='flex gap-2 justify-center items-center'>
                                        <button onClick={() => editOpen(e)} className='bg-blue-600 p-2 rounded-md text-white transition-transform duration-200 hover:scale-110 shadow-md'><MdEdit /></button>
                                        <button onClick={() => showModalDeleted(e.id)} className='bg-red-600 p-2 rounded-md text-white transition-transform duration-200 hover:scale-110 shadow-md'><MdDeleteForever /></button>
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

export default TableMovie;