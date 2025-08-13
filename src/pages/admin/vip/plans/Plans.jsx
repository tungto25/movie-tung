import { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TablePlan from './TablePlan';
import ModalPlan from './ModalPlan';

const inner = { level: "", price: "" }
function Plans(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [plan, setPlan] = useState(inner);
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
        setPlan(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setPlan(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    return (
        <div>
            <div>
                <SearchAdmin title="Plans" buttonText="PLAN" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TablePlan editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalPlan inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} plan={plan} setPlan={setPlan} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Plans;