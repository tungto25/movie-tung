import { useState } from "react";
import ModalDeleted from "../../../../components/admin/ModalDeleted";
import SearchAdmin from "../../../../components/admin/SearchAdmin";
import ModalEpisodes from "./ModalEpisodes";
import TableEpisodes from "./TableEpisodes";
import * as XLSX from "xlsx";
import { addDocument } from '../../../../services/FirebaseService';

const inner = { section: "", videoUrl: "", episodeNumber: "", movieId: "" };
function Episodes(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [episode, setEpisode] = useState(inner);
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
        setEpisode(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setEpisode(items);
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
                movieId: row[0] ? String(row[0]).trim() : "",
                episodeNumber: row[1],
                sectionId: row[2],
                videoUrl: row[3],
            }));

            setRows(formatted);
        };
        reader.readAsArrayBuffer(file);
    };

    const addToExcel = async () => {
        try {
            const validRows = rows.filter(
                (row) =>
                    row.movieId && String(row.movieId).trim() !== "" &&
                    row.episodeNumber && String(row.episodeNumber).trim() !== ""
            );

            if (validRows.length === 0) {
                alert("Không có dữ liệu hợp lệ để thêm!");
                return;
            }

            await Promise.all(
                validRows.map(async (row) => {
                    await addDocument("Episodes", {
                        movieId: row.movieId ? String(row.movieId).trim() : "",
                        episodeNumber: row.episodeNumber ? String(row.episodeNumber).trim() : "",
                        sectionId: row.sectionId ? String(row.sectionId).trim() : "0",
                        videoUrl: row.videoUrl ? String(row.videoUrl).trim() : "",
                    });
                })
            );

            alert("Thêm thành công!");
            setRows([]);
            setOpenExcel(false);
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra!");
        }
    };

    return (
        <div>
            <div>
                <SearchAdmin openExcel={openExcel} setOpenExcel={setOpenExcel} addToExcel={addToExcel} handleFileUpload={handleFileUpload} title="Episodes" buttonText="EPISODE" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TableEpisodes editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalEpisodes inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} episode={episode} setEpisode={setEpisode} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Episodes;