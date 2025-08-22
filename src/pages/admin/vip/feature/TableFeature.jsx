import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useContext } from 'react';
import PaginationTable from '../../../../components/admin/PaginationTable';
import { ContextFeatures } from '../../../../contexts/FeatureProvider';
import { ContextPlans } from '../../../../contexts/PlanProvider';
import { getOjectById, truncateText } from '../../../../services/reponsitory';

function TableFeature({ editOpen, setIdDeleted, setOpenDeleted, page, setPage, search }) {
    const features = useContext(ContextFeatures);
    const plans = useContext(ContextPlans);

    const rowsPerPage = 5;

    const handleChange = (event, value) => {
        setPage(value);
    };
    const dataSearch = features.filter(e => e.plan.toLowerCase().includes(search));

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
                            <TableCell align="center">Plan</TableCell>
                            <TableCell align='center'>Text</TableCell>
                            <TableCell align='center'>Available</TableCell>
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
                                <TableCell align="center">{getOjectById(plans, e.plan)?.title}</TableCell>
                                <TableCell align="center">{truncateText(e.text)}</TableCell>
                                <TableCell align="center">{e.available}</TableCell>
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

export default TableFeature;