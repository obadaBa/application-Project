// src/ui/pages/ResetPassword/ResetPasswordPage.jsx

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
import { Lock, LockReset, Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.warning("يرجى إدخال كلمة السر وتأكيدها");
      return;
    }

    if (password.length < 6) {
      toast.error("كلمة السر يجب أن تكون 6 محارف على الأقل");
      return;
    }

    if (password !== confirm) {
      toast.error("كلمتا السر غير متطابقتين");
      return;
    }

    // بدون ربط لسا – لاحقاً رح نحط TanStack Mutation
    console.log("New Password:", password);
    toast.success("تم تغيير كلمة المرور بنجاح (من غير ربط حالياً)");
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
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Icon */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LockReset />
          </Avatar>
        </Box>

        <Typography variant="h5" align="center" fontWeight={600}>
          تعيين كلمة مرور جديدة
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          يرجى إدخال كلمة مرور جديدة وتأكيدها
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* حقل كلمة السر */}
          <TextField
            label="كلمة المرور الجديدة"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((p) => !p)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* تأكيد كلمة السر */}
          <TextField
            label="تأكيد كلمة المرور"
            fullWidth
            margin="normal"
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm((p) => !p)}>
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            حفظ كلمة المرور الجديدة
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
