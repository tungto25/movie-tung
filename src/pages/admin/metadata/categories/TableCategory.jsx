import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import PaginationTable from "../../../../../src/components/admin/PaginationTable";
import { useContext, useState } from 'react';
import { ContextCategories } from '../../../../contexts/CategoryProvider';
import { truncateText } from '../../../../services/reponsitory';

export default function TableCategory({ editOpen, setIdDeleted, setOpenDeleted, search, page, setPage }) {
    const categories = useContext(ContextCategories);
    // Bắt đầu từ 1
    const rowsPerPage = 5; // Số item mỗi trang
    // Xử lý khi đổi trang
    const handleChange = (event, value) => {
        setPage(value);
    };
    const dataSearch = categories.filter(e => e.name.toLowerCase().includes(search));

    // Cắt dữ liệu để hiển thị
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
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Decription</TableCell>
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
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="right">{e.name}</TableCell>
                                <TableCell align="right">{truncateText(e.description)}</TableCell>
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
