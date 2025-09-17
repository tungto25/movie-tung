import React, { useContext, useEffect, useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableMovie from "./TableMovie";
import ModalMovie from './ModalMovie';
import ModalDeleted from '../../../../components/admin/ModalDeleted';
import { ContextAuthors } from '../../../../contexts/AuthorProvider';
import { ContextCategories } from '../../../../contexts/CategoryProvider';
import { ContextActors } from '../../../../contexts/ActorProvider';
import { ContextCharacters } from '../../../../contexts/CharacterProvider';
import { ContextPlans } from '../../../../contexts/PlanProvider';
import { ContextCountries } from '../../../../contexts/CountryProvider';
import { ContextMovies } from '../../../../contexts/MovieProvider';
import * as XLSX from "xlsx";
import { addDocument } from '../../../../services/FirebaseService';
import { ContextMovieTypes } from '../../../../contexts/MovieTypeProvider';

const inner = {
    name: "", description: "", imgUrl: "", videoUrl: "", year: "",
    author: "", duration: "", plan: "", rent: "", country: "", movieTypes: "",
    listCate: [], listActor: [], listCharacter: []
};
function Movies(props) {
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [movie, setMovie] = useState(inner);
    const [error, setError] = useState(inner);
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [openExcel, setOpenExcel] = useState(false);

    const authors = useContext(ContextAuthors);
    const actors = useContext(ContextActors);
    const categories = useContext(ContextCategories);
    const characters = useContext(ContextCharacters);
    const plans = useContext(ContextPlans);
    const movies = useContext(ContextMovies);
    const countries = useContext(ContextCountries);
    const movieTypes = useContext(ContextMovieTypes);

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
        setMovie(inner);
        setError(inner);
    }
    const editOpen = (items) => {
        setError(inner);
        setOpen(true);
        setMovie(items);
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

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const formatted = jsonData.slice(1).map((row, index) => {
                console.log("Row", index, "plan:", row[6]); // Debug

                return {
                    name: row[0],
                    description: row[1],
                    imgUrl: row[2],
                    videoUrl: row[3],
                    duration: row[4] ? String(row[4]).trim() : "",
                    author: row[5] ? String(row[5]).trim() : "",
                    plan: row[6] && String(row[6]).trim() !== "" ? String(row[6]).trim() : "free",
                    country: row[7] ? String(row[7]).trim() : "",
                    movieType: row[8] ? String(row[8]).trim() : "",
                    rent: row[9] ? parseFloat(row[9]) : 0,
                    year: row[10] ? String(row[10]).trim() : "",
                    listActor: row[11] ? row[11].split(",").map((s) => s.trim()) : [],
                    listCate: row[12] ? row[12].split(",").map((s) => s.trim()) : [],
                    listCharacter: row[13] ? row[13].split(",").map((s) => s.trim()) : [],
                };
            });

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
                    await addDocument("Movies", {
                        name: row.name ? String(row.name).trim() : "",
                        description: row.description ? String(row.description).trim() : "",
                        imgUrl: row.imgUrl ? String(row.imgUrl).trim() : "",
                        videoUrl: row.videoUrl ? String(row.videoUrl).trim() : "",
                        duration: row.duration ? String(row.duration).trim() : "",
                        rent: row.rent ? parseFloat(row.rent) : 0,

                        author: row.author ? String(row.author).trim() : "",
                        country: row.country ? String(row.country).trim() : "",
                        plan: row.plan ? String(row.plan).trim() : "",
                        movieType: row.movieType ? String(row.movieType).trim() : "",
                        year: row.year ? String(row.year).trim() : "",

                        listActor: row.listActor || [],
                        listCate: row.listCate || [],
                        listCharacter: row.listCharacter || [],
                    });
                })
            );

            alert("Thêm movie thành công!");
            setRows([]);
            setOpenExcel(false); 
            setFile(null);
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra!");
        }
    };

    return (
        <div>
            <div>
                <SearchAdmin openExcel={openExcel} setOpenExcel={setOpenExcel} addToExcel={addToExcel} handleFileUpload={handleFileUpload}
                    title="Movies" buttonText="MOVIE" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TableMovie movieTypes={movieTypes} movies={movies} countries={countries} categories={categories} actors={actors} characters={characters} plans={plans}
                    editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalMovie movieTypes={movieTypes} authors={authors} actors={actors} categories={categories} characters={characters} plans={plans} countries={countries}
                    inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} movie={movie} setMovie={setMovie} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Movies;