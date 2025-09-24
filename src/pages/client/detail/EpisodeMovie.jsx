import React, { useContext, useState } from 'react';
import { FaBell, FaPlay } from 'react-icons/fa';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CgMenuLeft } from "react-icons/cg";
import { MdOutlineSubtitles } from "react-icons/md";
import { ContextEpisodes } from '../../../contexts/EpisodeProvider';
import { Link, useParams } from 'react-router-dom';
import { ContextSections } from '../../../contexts/SectionProvider';
import { getOjectById } from '../../../services/reponsitory';

function EpisodeMovie() {
    const [selected, setSelected] = useState("Phần 1");
    const selectedSeason = selected.replace("Phần ", "");
    const [open, setOpen] = useState(false);
    const episodes = useContext(ContextEpisodes);
    const sections = useContext(ContextSections)
    const { id } = useParams();

    return (
        <div className='mt-7'>
            <div className='bg-blue-900 bg-gradient-to-r from-blue-700/40 via-purple-600/50 to-purple-700
                            rounded-md p-2 flex items-center gap-4'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 p-2'>
                    <FaBell className="text-yellow-400 text-xl bell-animate" />
                </div>
                <p>phần 3 sẽ công chiếu vào 25-12-2025.Các bạn nhớ đón xem nhé 😘</p>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center gap-3 my-5 relative'>
                    <CgMenuLeft className='text-yellow-400' />
                    <p>{selected}</p>
                    <button
                        onClick={() => setOpen(!open)}
                        className=""
                    >
                        <ArrowDropDownIcon />
                    </button>
                    {open && (
                        <ul className="absolute top-4 translate-y-4 right-0 w-auto bg-gray-700 text-white rounded-lg shadow-lg z-10 p-1">
                            {sections.map((section) => (
                                <div
                                    key={section.id}
                                    onClick={() => {
                                        setSelected(`Phần ${section.season}`);
                                        setOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                >
                                    Phần {section.season}
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mx-4 border-l border-gray-500 h-6"></div>
                <div className='flex items-center gap-2 p-2 border rounded-md text-xs ms-2'>
                    <MdOutlineSubtitles />
                    <p >Phụ đề</p>
                </div>
                <div className='flex items-center gap-2 p-2 text-xs ms-2'>
                    <MdOutlineSubtitles />
                    <p >Thuyết minh</p>
                </div>
            </div>
            <div className="grid grid-cols-7 text-white mt-2 gap-3">
                {episodes.filter(f => getOjectById(sections, f.sectionId)?.season === selectedSeason && f.movieId === id).filter(a => a.movieId == id).sort((a, b) => a.episodeNumber - b.episodeNumber).map((e, i) => (
                    <Link to={`/playmovie/${e.id}`}
                        className="bg-gray-600/40 rounded-md px-5 py-2 flex items-center gap-2 whitespace-nowrap"
                    >
                        <FaPlay className="text-[8px]" />
                        tập {e.episodeNumber}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default EpisodeMovie;