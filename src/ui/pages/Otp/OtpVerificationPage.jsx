import { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { Verified, Dialpad } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthCard from "../../components/AuthCard";

const OTP_LENGTH = 6;

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const sanitized = value.replace(/\D/g, "");
    if (!sanitized) return;

    const newOtp = [...otp];
    newOtp[index] = sanitized.charAt(0);
    setOtp(newOtp);

    if (index < OTP_LENGTH - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0 && inputsRef.current[index - 1]) {
        inputsRef.current[index - 1].focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < OTP_LENGTH; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);

    const lastIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    if (lastIndex >= 0 && inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      toast.warning("يرجى إدخال رمز مكوّن من 6 أرقام");
      return;
    }

    // لاحقاً: استبدلها بـ useAppMutation + verifyOtp useCase
    console.log("OTP code:", code);
    toast.success("تم تأكيد الرمز (وهمي حالياً)");

    // ممكن بعدين:
    // navigate("/reset-password");
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
            <Verified />
          </Avatar>

          <Typography variant="h5" mt={2} fontWeight={600}>
            تأكيد الرمز
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            أدخل رمز التحقق المكوّن من 6 أرقام
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1.5}
            sx={{ mb: 3, mt: 2 }}
          >
            {otp.map((value, index) => (
              <TextField
                key={index}
                value={value}
                inputRef={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.6rem",
                    padding: "10px",
                  },
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                sx={{
                  width: 50,
                }}
              />
            ))}
          </Stack>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            startIcon={<Dialpad />}
          >
            تأكيد الرمز
          </Button>

          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/forgot-password")}
          >
            العودة إلى استعادة كلمة المرور
          </Button>
        </form>
      </AuthCard>
    </Box>
  );
}
