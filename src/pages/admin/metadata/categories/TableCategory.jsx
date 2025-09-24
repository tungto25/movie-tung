import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import PaginationTable from "../../../../../src/components/admin/PaginationTable";
import { useContext, useState } from 'react';
import { ContextCategories } from '../../../../contexts/CategoryProvider';
import  { truncateText, useSearch } from '../../../../services/reponsitory';
import { deleteDocument } from '../../../../services/FirebaseService'; // API xóa

export default function TableCategory({ editOpen, setIdDeleted, setOpenDeleted, search, page, setPage }) {
    const categories = useContext(ContextCategories);

    const rowsPerPage = 5;
    const [selectedIds, setSelectedIds] = useState([]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const dataSearch = useSearch(categories, search, (e) => e.name );

    const paginatedData = dataSearch.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const showModalDeleted = (id) => {
        setOpenDeleted(true);
        setIdDeleted(id);
    };

    // Chọn/bỏ chọn 1 item
    const handleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Chọn tất cả trên trang hiện tại
    const handleSelectAll = () => {
        const allIds = dataSearch.map(e => e.id); // lấy tất cả id trong bảng đã search
        const allSelected = allIds.every(id => selectedIds.includes(id));

        if (allSelected) {
            // Bỏ chọn tất cả
            setSelectedIds([]);
        } else {
            // Chọn tất cả
            setSelectedIds(allIds);
        }
    };

    // Xóa tất cả item được chọn
    const handleDeleteAll = async () => {
        if (selectedIds.length === 0) {
            alert("Chưa chọn mục nào để xóa!");
            return;
        }

        if (!window.confirm("Bạn có chắc chắn muốn xóa tất cả?")) return;

        try {
            await Promise.all(selectedIds.map(id => deleteDocument("Categories", id)));
            setSelectedIds([]);
            alert("Đã xóa tất cả mục đã chọn!");
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi xóa!");
        }
    };

    return (
        <>
            {selectedIds.length > 0 && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleDeleteAll}
                        className="bg-red-600 px-4 py-2 rounded-md text-white"
                    >
                        Xóa tất cả
                    </button>
                </div>
            )}
            <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 4px 20px rgba(106,114,130)" }}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        <TableRow sx={{
                            backgroundColor: "rgba(3, 7, 18, 0.8)",
                            "& .MuiTableCell-root": {
                                fontWeight: "bold",
                                color: "white"
                            }
                        }}>
                            <TableCell>
                                <Checkbox
                                    checked={paginatedData.length > 0 && paginatedData.every(e => selectedIds.includes(e.id))}
                                    onChange={handleSelectAll}
                                    sx={{ color: "white" }}
                                />
                            </TableCell>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                        {paginatedData.map((e, index) => (
                            <TableRow key={e.id}
                                sx={{
                                    background: "rgba(31, 41, 55, 0.8)",
                                    "& .MuiTableCell-root": { color: "white" }
                                }}
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(e.id)}
                                        onChange={() => handleSelect(e.id)}
                                        sx={{ color: "white" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {(page - 1) * rowsPerPage + index + 1}
                                </TableCell>

                                <TableCell align="center">{e.name}</TableCell>
                                <TableCell align="right">{truncateText(e.description)}</TableCell>
                                <TableCell>
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
