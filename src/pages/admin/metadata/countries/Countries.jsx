import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { useContext, useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TableCountry from './TableCountry';
import ModalCountry from './ModalCountry';
import { ContextCountries } from '../../../../contexts/CountryProvider';

const inner = { name: "", description: "" };
function Countries(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [country, setCountry] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);

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
        setCountry(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setCountry(items);
    }
    const handleUpdate = () => {
        setUpdate(!update)
    }
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Lấy sheet đầu tiên
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // jsonData là mảng 2 chiều (dòng, cột)
            // Bỏ dòng tiêu đề nếu cần
            const formatted = jsonData.slice(1).map((row) => ({
                name: row[0],
                description: row[1],
            }));

            setRows(formatted);
        };
        reader.readAsArrayBuffer(file);
    };

    const addToExcel = async () => {
        try {
            await Promise.all(
                rows.map(async (row) => {
                    await addDocument("Countries", row); // row thay vì 
                })
            );
            alert("Thêm thành công!");
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra!");
        }
    };

    return (
        <div>
            <SearchAdmin addToExcel={addToExcel} handleFileUpload={handleFileUpload} title="Countries" buttonText="COUNTRY" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <TableCountry editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
            <ModalCountry inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} country={country} setCountry={setCountry} error={error} setError={setError} />
            <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
        </div>
    );
}

export default Countries;