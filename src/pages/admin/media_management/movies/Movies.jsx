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

const inner = {
    name: "", description: "", imgUrl: "https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png",
    author: "", duration: "", plan: "", rent: "", country: "",
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

    const authors = useContext(ContextAuthors);
    const actors = useContext(ContextActors);
    const categories = useContext(ContextCategories);
    const characters = useContext(ContextCharacters);
    const plans = useContext(ContextPlans);
    const movies = useContext(ContextMovies);
    const countries = useContext(ContextCountries);
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

    return (
        <div>
            <div>
                <SearchAdmin title="Movies" buttonText="MOVIE" handleOpen={handleOpen} search={search} setSearch={setSearch} handleSearch={handleSearch} />
                <TableMovie movies={movies} countries={countries} categories={categories} actors={actors} characters={characters} plans={plans}
                    editOpen={editOpen} setOpenDeleted={setOpenDeleted} setIdDeleted={setIdDeleted} page={page} setPage={setPage} search={search} />
                <ModalMovie authors={authors} actors={actors} categories={categories} characters={characters} plans={plans} countries={countries}
                    inner={inner} handleUpdate={handleUpdate} open={open} handleClose={handleClose} movie={movie} setMovie={setMovie} error={error} setError={setError} />
                <ModalDeleted openDeleted={openDeleted} handleCloseDel={handleCloseDel} idDeleted={idDeleted} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

export default Movies;