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
  Lock,
  LockReset,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthCard from "../../components/AuthCard";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

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

    // لاحقاً: استبدلها بـ useAppMutation + resetPassword useCase
    console.log("New password:", password);
    toast.success("تم تغيير كلمة المرور (وهمي حالياً)");

    // ممكن بعدين:
    // navigate("/login");
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
            تعيين كلمة مرور جديدة
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            أدخل كلمة مرور جديدة وقم بتأكيدها
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <TextField
            fullWidth
            label="كلمة المرور الجديدة"
            type={showPassword ? "text" : "password"}
            value={password}
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
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

          <TextField
            fullWidth
            label="تأكيد كلمة المرور"
            type={showConfirm ? "text" : "password"}
            value={confirm}
            margin="normal"
            onChange={(e) => setConfirm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm((prev) => !prev)}>
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
            حفظ كلمة المرور الجديدة
          </Button>

          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/login")}>
            العودة إلى تسجيل الدخول
          </Button>
        </form>
      </AuthCard>
    </Box>
  );
}
