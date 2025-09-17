import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { useState } from 'react';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import TableAuthor from './TableAuthor';
import ModalAuthor from './ModalAuthor';
import * as XLSX from "xlsx";
import { addDocument } from '../../../../services/FirebaseService';

const inner = { name: "", description: "", imgUrl: "" };
function Authors(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [author, setAuthor] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [openExcel, setOpenExcel] = useState(false);

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
        setAuthor(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setAuthor(items);
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
                image: row[2]
            }));

            setRows(formatted);
        };
        reader.readAsArrayBuffer(file);
    };

    const addToExcel = async () => {
        try {
            // Lọc bỏ dòng không hợp lệ (không có name)
            const validRows = rows.filter((row) => row.name && row.name.trim() !== "");

            if (validRows.length === 0) {
                alert("Không có dữ liệu hợp lệ để thêm!");
                return;
            }

            await Promise.all(
                validRows.map(async (row) => {
                    await addDocument("Authors", {
                        name: row.name.trim(),
                        description: row.description ? row.description.trim() : "",
                        imgUrl: row.image ? row.image.trim() : "",
                    });
                })
            );

            alert("Thêm thành công!");
            setRows([]); // clear data sau khi thêm
            setOpenExcel(false); // đóng modal
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra!");
        }
    };
    return (
        <div>
            <div>
                <SearchAdmin openExcel={openExcel} setOpenExcel={setOpenExcel} addToExcel={addToExcel} handleFileUpload={handleFileUpload} title="Authors" buttonText="AUTHOR" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TableAuthor editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalAuthor inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} author={author} setAuthor={setAuthor} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Authors;