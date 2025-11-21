// src/ui/pages/Login/LoginPage.jsx
import { useState } from "react";
import {
  Box,
  Paper,
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


import { toast } from "react-toastify";
import { loginUser } from "../../../domain/user/useCases/loginUser";
import { useNavigate } from "react-router-dom";
import { useAppMutation } from "../../hooks/useAppMutation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

 const loginMutation = useAppMutation({
  mutationFn: ({ username, password }) => loginUser(username, password),
  successMessage: "تم تسجيل الدخول بنجاح ✨", // رسالة نجاح جاهزة من الـ Aspect

  // لو بدك منطق إضافي على النجاح (غير التوست):
  onSuccess: (data) => {
    // مثال: خزن التوكن أو روح على صفحة تانية
    // localStorage.setItem("token", data.token);
    // navigate("/dashboard");
    console.log("Logged in:", data);
  },

  // onError اختياري إذا بدك شي غير التوست
  // onError: (error) => { ... }
});


  const handleSubmit = (e) => {
  e.preventDefault();

  if (!username || !password) {
    toast.warning("يرجى إدخال اسم المستخدم وكلمة السر");
    return;
  }

  loginMutation.mutate({ username, password });
};



  const isLoading = loginMutation.isPending;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LockOutlined />
          </Avatar>
        </Box>
        
        <Typography variant="h5" align="center" fontWeight={600}>
          تسجيل الدخول
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary">
          أدخل اسم المستخدم وكلمة السر للمتابعة
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="اسم المستخدم"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="كلمة السر"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
          variant="body2"
          sx={{ mt: 1, textAlign: "right", cursor: "pointer" }}
          color="primary"
          onClick={() => navigate("/forgot-password")}
        >
          نسيت كلمة المرور؟
        </Typography>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
