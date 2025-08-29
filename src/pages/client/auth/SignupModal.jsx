import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    Stack,
    Link,
    Divider,
} from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { addDocument, updateDocument } from "../../../services/FirebaseService";
import { ContextAccount } from "../../../contexts/AccountProvider";
import { ROLES } from "../../../untils/Constants";

const inner = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles : ROLES.USER
};
export default function SignupModal({ openLogin, handleCloseLogin }) {
    const [form, setForm] = useState(inner);
    const [error, setError] = useState(inner);
    const accounts = useContext(ContextAccount);
    const validation = () => {
        
        const newError = {
            name: form.name ? "" : "Please enter name",
            email: form.email ? "" : "Please enter email",
            password: form.password ? "" : "Please enter password",
            confirmPassword: form.confirmPassword == form.password ? "" : form.password ? "Mật khẩu không trùng khớp" : "",
        };
      
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };
    const handleAdd = async () => {
        if (!validation()) {
            return
        }

        if (form.id) {
            await updateDocument("Accounts", form);
        } else {
            const { confirmPassword, ...newAccount } = form;
            await addDocument("Accounts", newAccount);
        }
        handleCloseLogin();
        setForm(inner);
    }
    const handleChange = (e) => {
        if (e.target.name == "email") {
            const check = accounts.some(x => x.email == e.target.value);
            const emailError = check ? "Email đã được sử dụng" : "";
            setError({ ...error, email: emailError })
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        // Gọi API đăng ký tại đây
    };

    return (
        <Modal
            open={openLogin}
            onClose={handleCloseLogin}
            aria-labelledby="signup-modal-title"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 420,
                    bgcolor: "#1a2340",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    color: "#fff",
                }}
            >
                <Typography id="signup-modal-title" variant="h6" fontWeight="bold" mb={2}>
                    Tạo tài khoản mới
                </Typography>

                <Typography variant="body2" mb={3}>
                    Nếu bạn đã có tài khoản,{" "}
                    <Link href="#" underline="hover" sx={{ color: "#FFD54F" }}>
                        đăng nhập
                    </Link>
                </Typography>

                <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="name"
                        placeholder="Tên hiển thị"
                        value={form.name}
                        onChange={handleChange}
                        InputProps={{ style: { color: "#fff" } }}
                        error={!!error.name}
                        helperText={error.name}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        InputProps={{ style: { color: "#fff" } }}
                        error={!!error.email}
                        helperText={error.email}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={form.password}
                        onChange={handleChange}
                        InputProps={{ style: { color: "#fff" } }}
                        error={!!error.password}
                        helperText={error.password}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        InputProps={{ style: { color: "#fff" } }}
                        error={!!error.confirmPassword}
                        helperText={error.confirmPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: "#fdd835",
                            color: "#000",
                            fontWeight: "bold",
                            "&:hover": { bgcolor: "#fbc02d" },
                        }}
                        onClick={handleAdd}
                    >
                        Đăng ký
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
