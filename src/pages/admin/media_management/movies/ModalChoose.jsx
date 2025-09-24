import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    Badge,
    IconButton
} from '@mui/material';
import { IoIosSearch } from 'react-icons/io';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSearch } from '../../../../services/reponsitory';

function ModalChoose({ openChoosen, handleCloseChoosen, dataChoose, modalType, handleChoose, getChoose }) {
    const [search, setSearch] = useState("");
    const dataSearch = useSearch(dataChoose, search, (e) => e.name);
    console.log(getChoose);
    const selected = (id) => {
        return getChoose.includes(id);
    }

    return (
        <Dialog
            open={openChoosen}
            onClose={handleCloseChoosen}
            maxWidth="md"
            fullWidth
        >
            {/* Tiêu đề */}
            <DialogTitle>
                <div className='flex justify-between items-center gap-5 md:gap-15 flex-col md:flex-row'>
                    <h1 className='whitespace-nowrap'>Modal {modalType}</h1>
                    <div className="flex items-center ml-auto rounded-lg shadow-md p-1 border">
                        <IoIosSearch className="px-1 text-3xl text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Enter keyWords..."
                            className="focus:outline-none"
                        />
                    </div>
                </div>
            </DialogTitle>

            <DialogContent dividers>
                <div className='flex flex-wrap gap-3'>
                    {
                        dataSearch.map((e, idx) => (
                            modalType !== "categories" ? <div
                                onClick={() => handleChoose(modalType, e.id)}
                                key={idx}
                                className="cursor-pointer rounded-full
                                transition-transform duration-200 hover:scale-105
                                flex flex-col items-center"

                            >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                            padding: 0,
                                            transform: "translate(0px, 0px)"
                                        },
                                    }}
                                    badgeContent={selected(e.id) ? (
                                        <IconButton
                                            size="small"
                                            sx={{
                                                bgcolor: "white",
                                                p: 0,
                                                boxShadow: 1,
                                                "&:hover": { bgcolor: "grey.200" },
                                                color: "green",
                                            }}
                                        >
                                            <CheckCircleIcon fontSize="inherit" />
                                        </IconButton>
                                    ) : ""}
                                >
                                    <div style={{ position: "relative", width: 80, height: 80 }}>
                                        {/* Avatar ở giữa */}
                                        <Avatar
                                            src={e.imgUrl}
                                            alt="actors Image"
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                margin: "auto",
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        />

                                        {/* Text SVG vòng quanh */}
                                        <svg
                                            viewBox="0 0 200 200"
                                            width="100%"
                                            height="100%"
                                            style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
                                        >
                                            <defs>
                                                <path
                                                    id={`circlePath-${e.id}`}
                                                    d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                                                />
                                            </defs>

                                            <text
                                                fill="black"
                                                fontSize="28"
                                                fontWeight="bold"
                                                letterSpacing="2"
                                            >
                                                <textPath
                                                    href={`#circlePath-${e.id}`}
                                                    startOffset="50%"
                                                    textAnchor="middle"
                                                >
                                                    {e.name}
                                                </textPath>
                                            </text>
                                        </svg>

                                    </div>
                                </Badge>

                            </div>
                                : <h1
                                    onClick={() => handleChoose(modalType, e.id)}
                                    key={idx}
                                    className={` px-3 py-1 
                                rounded text-sm cursor-pointer flex items-center p-2 border
                                transition-transform duration-200 hover:scale-105 
                                ${selected(e.id) ? "border-green-500 text-green-500" : "border-gray-500 text-gray-500"}`}
                                >
                                    {e.name}
                                </h1>
                        ))
                    }
                </div>
            </DialogContent>
            {/* <DialogActions>
                <Button variant="contained" >Add</Button>
                <Button onClick={handleCloseChoosen} variant="contained" color="error">
                    Cancel
                </Button>
            </DialogActions> */}
        </Dialog >
    );
}

export default ModalChoose;
