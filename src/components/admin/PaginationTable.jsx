import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function PaginationTable({ data, handleChange, page, rowsPerPage }) {

    return (
        <div className='mt-2 flex justify-end'>
            <Stack spacing={2}>
                <Pagination
                    color="primary"
                    count={Math.ceil(data.length / rowsPerPage)}
                    page={page}
                    onChange={handleChange}
                    renderItem={(data) => (
                        <PaginationItem
                            sx={{
                                color: "white", // màu số & icon mặc định
                                "&.Mui-selected": {
                                    backgroundColor: "gray", // nền khi chọn
                                    color: "white", // màu chữ khi chọn
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "white", // màu icon mũi tên
                                }
                            }}
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...data}
                        />
                    )}
                />
            </Stack>
        </div>
    );
}

export default PaginationTable;