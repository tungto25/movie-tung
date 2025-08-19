import {
    TextField,
} from "@mui/material";

export default function Information() {
    return (
        <div className="bg-gray-800/80 w-full p-5 rounded-3xl shadow-2xl">
            <h1 className="font-bold text-2xl border-b-1 border-black pb-2">INFORMATION</h1>
            <div className="flex flex-col md:flex-row gap-2">
                <TextField
                    name="name"
                    label="First Name"
                    fullWidth
                    sx={{
                        mt: 2,
                        "& .MuiInputBase-root": {
                            color: "white", // màu chữ nhập
                        },
                        "& .MuiInputLabel-root": {
                            color: "white", // màu label
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "rgba(255,255,255,0.7)" // màu placeholder
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.5)" // viền
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        }
                    }}
                    placeholder="Enter your name"
                />
                <TextField
                    name="name"
                    label="Last Name"
                    fullWidth
                    sx={{
                        mt: 2,
                        "& .MuiInputBase-root": {
                            color: "white", // màu chữ nhập
                        },
                        "& .MuiInputLabel-root": {
                            color: "white", // màu label
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "rgba(255,255,255,0.7)" // màu placeholder
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.5)" // viền
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        }
                    }}
                    placeholder="Enter your name"
                />
            </div>
            <TextField
                name="Email"
                label="Email"
                fullWidth
                sx={{
                    mt: 2,
                    "& .MuiInputBase-root": {
                        color: "white", // màu chữ nhập
                    },
                    "& .MuiInputLabel-root": {
                        color: "white", // màu label
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: "rgba(255,255,255,0.7)" // màu placeholder
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)" // viền
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white"
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white"
                    }
                }}
                placeholder="Enter your Email"
            />
            <TextField
                name="Address"
                label="Address"
                fullWidth
                sx={{
                    mt: 2,
                    "& .MuiInputBase-root": {
                        color: "white", // màu chữ nhập
                    },
                    "& .MuiInputLabel-root": {
                        color: "white", // màu label
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: "rgba(255,255,255,0.7)" // màu placeholder
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)" // viền
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white"
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white"
                    }
                }}
                placeholder="Enter your Address"
            />
            <div className="flex flex-col md:flex-row gap-2">
                <TextField
                    name="number"
                    label="Phone Number"
                    fullWidth
                    sx={{
                        mt: 2,
                        "& .MuiInputBase-root": {
                            color: "white", // màu chữ nhập
                        },
                        "& .MuiInputLabel-root": {
                            color: "white", // màu label
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "rgba(255,255,255,0.7)" // màu placeholder
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.5)" // viền
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        }
                    }}
                    type="number"
                    placeholder="Enter your Address"
                />
                <TextField
                    type="date"
                    fullWidth
                    sx={{
                        mt: 2,
                        input: { color: "white" }, // chữ ngày
                        "& .MuiInputLabel-root": { color: "white" }, // label nếu có
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.5)" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" }
                    }}
                    InputLabelProps={{
                        shrink: true, // giữ label luôn ở trên
                    }}
                />
            </div>
            <button
                type="button"
                className="mt-10 bg-blue-800 px-3 py-2 rounded-md block m-auto shadow-2xl text-white 
             transition transform active:scale-95 active:shadow-inner shadow-2xl"
            >
                Submit
            </button>

        </div>
    );
}
