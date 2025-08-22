import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useContext, useState } from 'react';
import PaginationTable from '../../../../components/admin/PaginationTable';
import { BiSolidCategory } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import { getOjectById, truncateText } from '../../../../services/reponsitory';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { yellow } from "@mui/material/colors";

function TableMovie({ editOpen, setIdDeleted, setOpenDeleted, page, setPage, search, movies, categories, actors, characters, plans, countries }) {
    const rowsPerPage = 5;

    const handleChange = (event, value) => {
        setPage(value);
    };
    const dataSearch = movies.filter(e => e.name.toLowerCase().includes(search));

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
                src={getOjectById(dataFilter, a)?.img}
                alt="Actor Image"
                sx={{
                    width: 30,
                    height: 30,
                    margin: 'auto',
                }}
            />
        ))
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
                            <TableCell align="center">Plans</TableCell>
                            <TableCell align="center">Country</TableCell>
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