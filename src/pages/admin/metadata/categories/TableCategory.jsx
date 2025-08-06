import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useContext, useState } from 'react';
import { ContextCategories } from "../../../../contexts/CategoryProvider";
import ModalDeleted from '../../../../components/admin/ModalDeleted';

export default function TableCategory({ editOpen }) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const categories = useContext(ContextCategories);
    const showModalDeleted = (id) => {
        setOpenDeleted(true);
        setIdDeleted(id);
    }
    const handleCloseDel = () => {
        setOpenDeleted(false);
    }
  console.log(categories);
  
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    <TableRow >
                        <TableCell>#</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Decription</TableCell>
                        <TableCell align='center'>Action</TableCell>
                    </TableRow>
                    {categories.map((e,index) => (
                        <TableRow key={e.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell align="right">{e.name}</TableCell>
                            <TableCell align="right">{e.description}</TableCell>
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
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted}  />
        </TableContainer>

    );
}
