// src/ui/pages/ForgotPassword/ForgotPasswordPage.jsx

import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { Email, LockReset } from "@mui/icons-material";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("يرجى إدخال البريد الإلكتروني");
      return;
    }

    // بدون ربط – بس لحتى تجهز API لاحقاً
    toast.success("تم إرسال طلب استعادة كلمة المرور");
    console.log("Email sent:", email);
  };

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
            <LockReset />
          </Avatar>
        </Box>

        <Typography variant="h5" align="center" fontWeight={600}>
          استعادة كلمة المرور
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary">
          أدخل بريدك الإلكتروني لإرسال رمز التحقق
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="البريد الإلكتروني"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            إرسال رمز التحقق
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
