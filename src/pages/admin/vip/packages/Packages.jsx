import { useState } from 'react';
import ModalPackage from './ModalPackage';
import TablePackage from './TablePackage';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalDeleted from '../../../../components/admin/ModalDeleted';

const inner = { discount: "", plan: "", time: "", coupon: "" }
function Packages(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [packageData, setpackageData] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const handleSearch = (a) => {
        setSearch(a);
        setPage(1);
    }
    const handleCloseDel = () => {
        setOpenDeleted(false);
        setIdDeleted(null);
    }

    const handleOpen = () => {
        setOpen(true);
        setpackageData(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setpackageData(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    return (
        <div>
            <div>
                <SearchAdmin title="Packages" buttonText="PACKAGE" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TablePackage editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalPackage inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} packageData={packageData} setpackageData={setpackageData} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Packages;