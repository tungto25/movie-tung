import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import PaginationTable from '../../../../components/admin/PaginationTable';

function TableMovieTypes({ editOpen, displayData, setIdDeleted, setOpenDeleted }) {
    const [page, setPage] = useState(1); 
    const rowsPerPage = 5; 

    const handleChange = (event, value) => {
        setPage(value);
    };

 
    const paginatedData = displayData.slice(
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
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Decription</TableCell>
                            <TableCell align="right">Create At</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                        {paginatedData.map((e, index) => (
                            <TableRow key={e.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="right">{e.name}</TableCell>
                                <TableCell align="right">{e.description}</TableCell>
                                <TableCell align="right">{e.createAt}</TableCell>
                                <TableCell >
                                    <div className='flex gap-2 justify-center items-center'>
                                        <button onClick={() => editOpen(e)} className='bg-blue-600 p-2 rounded-md'><MdEdit /></button>
                                        <button onClick={() => showModalDeleted(e.id)} className='bg-red-600 p-2 rounded-md'><MdDeleteForever /></button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationTable data={displayData} handleChange={handleChange} page={page} rowsPerPage={rowsPerPage}/>
        </>


    );
}

export default TableMovieTypes;