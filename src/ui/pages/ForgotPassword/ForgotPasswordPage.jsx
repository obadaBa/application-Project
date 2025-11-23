import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { Email, LockReset } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthCard from "../../components/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verify-code");

    if (!email) {
      toast.warning("يرجى إدخال البريد الإلكتروني");
      return;
    }

    // لاحقاً: استبدلها بـ useAppMutation + sendResetCode useCase
    console.log("Request reset code for:", email);
    toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني (وهمي حالياً)");

    // ممكن بعدين تروح ع صفحة OTP:
    // navigate("/verify-code");
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
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              margin: "0 auto",
            }}
          >
            <LockReset />
          </Avatar>

          <Typography variant="h5" mt={2} fontWeight={600}>
            استعادة كلمة المرور
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            أدخل بريدك الإلكتروني لإرسال رمز التحقق
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            type="email"
            value={email}
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            إرسال رمز التحقق
          </Button>

          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/login")}>
            العودة إلى تسجيل الدخول
          </Button>
        </form>
      </AuthCard>
    </Box>
  );
}
