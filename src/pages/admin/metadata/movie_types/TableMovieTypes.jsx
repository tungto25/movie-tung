import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function TableMovieTypes({ editOpen, displayData, setIdDeleted, setOpenDeleted }) {

    const showModalDeleted = (id) => {
        setOpenDeleted(true);
        setIdDeleted(id);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    <TableRow >
                        <TableCell>#</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Decription</TableCell>
                        <TableCell align="right">Create At</TableCell>
                        <TableCell align='center'>Action</TableCell>
                    </TableRow>
                    {displayData.map((e, index) => (
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

    );
}

export default TableMovieTypes;