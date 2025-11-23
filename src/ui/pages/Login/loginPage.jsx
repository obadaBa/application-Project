// src/ui/pages/Login/LoginPage.jsx
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  LockOutlined,
  PersonOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useAppMutation } from "../../hooks/useAppMutation";
import { loginUser } from "../../../domain/user/useCases/loginUser";

import AuthCard from "../../components/AuthCard";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // AOP Mutation
  const loginMutation = useAppMutation({
    mutationFn: ({ username, password }) => loginUser(username, password),

    successMessage: "تم تسجيل الدخول بنجاح ✨",

    onSuccess: (data) => {
      // هون لح تخزن التوكن أو تنتقل دايركت حسب مشروعك
      // localStorage.setItem("token", data.token);
      console.log("Logged in:", data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
    }

    loginMutation.mutate({ username, password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <AuthCard>
        {/* اللوجو */}
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              margin: "0 auto",
            }}
          >
            <LockOutlined />
          </Avatar>

          <Typography variant="h5" mt={2} fontWeight={600}>
            تسجيل الدخول
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            الرجاء إدخال اسم المستخدم وكلمة السر
          </Typography>
        </Box>

        {/* الفورم */}
        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <TextField
            fullWidth
            label="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="كلمة السر"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>

          {/* زر نسيان كلمة المرور */}
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/forgot-password")}
          >
            نسيت كلمة المرور؟
          </Button>
        </form>
      </AuthCard>
    </Box>
  );
}
