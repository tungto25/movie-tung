import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Avatar, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useContext, useState } from 'react';
import PaginationTable from '../../../../components/admin/PaginationTable';
import { BiSolidCategory } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import useSearch, { getOjectById, truncateText } from '../../../../services/reponsitory';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { yellow } from "@mui/material/colors";
import { deleteDocument } from '../../../../services/FirebaseService'; // API xóa

function TableMovie({ editOpen, setIdDeleted, setOpenDeleted, page, setPage, search, movies, categories, actors, characters, plans, countries, movieTypes }) {
    const rowsPerPage = 5;
    const [selectedIds, setSelectedIds] = useState([]);

    const handleChange = (event, value) => {
        setPage(value);
    };
    const dataSearch = useSearch(movies, search, (e) => {
        const countryName = getOjectById(countries, e.country)?.name || "";
        const cateNames = e.listCate
            .map(c => getOjectById(categories, c)?.name || "")
            .join(" ");
        return `${e.name} ${countryName} ${cateNames}`;
    });
    const paginatedData = dataSearch.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const showModalDeleted = (id) => {
        setOpenDeleted(true);
        setIdDeleted(id);
    }

    const ShowTooltip = ({ data, dataFilter }) => {
        return data.map(a => (
            <Avatar
                src={getOjectById(dataFilter, a)?.imgUrl}
                alt="Actor Image"
                sx={{
                    width: 30,
                    height: 30,
                    margin: 'auto',
                }}
            />
        ))
    }
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
            await Promise.all(selectedIds.map(id => deleteDocument("Movies", id)));
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
                            <TableCell>
                                <Checkbox
                                    checked={paginatedData.length > 0 && paginatedData.every(e => selectedIds.includes(e.id))}
                                    onChange={handleSelectAll}
                                    sx={{ color: "white" }}
                                />
                            </TableCell>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Duration</TableCell>
                            <TableCell align="center">Plans</TableCell>
                            <TableCell align="center">Country</TableCell>
                            <TableCell align="center">MovieType</TableCell>
                            <TableCell align='center'>Categories</TableCell>
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
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(e.id)}
                                        onChange={() => handleSelect(e.id)}
                                        sx={{ color: "white" }}
                                    />
                                </TableCell>
                                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                <TableCell align="center" sx={{ width: "15px", height: "15px" }}>
                                    <Avatar
                                        variant="rounded"
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
                                <TableCell align="center">{e.duration} <span>min</span></TableCell>
                                <TableCell align="center">{getOjectById(plans, e.plan)?.title}</TableCell>
                                <TableCell align="center">{getOjectById(countries, e.country)?.name}</TableCell>
                                <TableCell align="center">{getOjectById(movieTypes, e.movieType)?.name}</TableCell>
                                <TableCell align='center'>
                                    <Tooltip title={e.listCate.map(a => (
                                        getOjectById(categories, a)?.name + ", "
                                    ))} placement="top" disableInteractive >
                                        <Button sx={{ margin: "auto", background: "purple", paddingY: 1, paddingX: 4, borderRadius: "6px", color: "white" }} className=' shadow-xl transition-transform duration-200 hover:scale-110'><BiSolidCategory /></Button>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align='center'>
                                    <Tooltip title={
                                        <div className='flex gap-2'>
                                            <ShowTooltip data={e.listActor} dataFilter={actors} />
                                            <ShowTooltip data={e.listCharacter} dataFilter={characters} />
                                        </div>
                                    } placement="top" disableInteractive >
                                        <Button sx={{ margin: "auto", backgroundColor: yellow[500], paddingY: 1, paddingX: 4, borderRadius: "6px", color: "white" }} className=' shadow-xl transition-transform duration-200 hover:scale-110'><FaUserLarge /></Button>
                                    </Tooltip>

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
            </TableContainer >
            <PaginationTable data={dataSearch} handleChange={handleChange} page={page} rowsPerPage={rowsPerPage} />
        </>
    );
}

export default TableMovie;