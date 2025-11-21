// src/ui/pages/Otp/OtpVerificationPage.jsx

import { useState, useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { Verified, Dialpad } from "@mui/icons-material";
import { toast } from "react-toastify";

const OTP_LENGTH = 6;

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    // خليه بس أرقام
    const sanitized = value.replace(/\D/g, "");

    if (!sanitized) return;

    const newOtp = [...otp];
    newOtp[index] = sanitized.charAt(0); // أول رقم بس
    setOtp(newOtp);

    // روح عالخانة اللي بعدها تلقائياً
    if (index < OTP_LENGTH - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // فضّي الخانة الحالية
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0 && inputsRef.current[index - 1]) {
        // ارجع للخانة اللي قبلها
        inputsRef.current[index - 1].focus();
      }
    }

    // تنقل بأسهم الكيبورد
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

    // ركّز عآخر خانة فيها رقم
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

    // هون لاحقاً رح نستدعي useCase + TanStack Mutation
    console.log("OTP code:", code);
    toast.success("تم إدخال الرمز بنجاح (بدون ربط حالياً)");
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
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <Verified />
          </Avatar>
        </Box>

        <Typography variant="h5" align="center" fontWeight={600}>
          تأكيد الرمز
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          أدخل رمز التحقق المكوّن من 6 أرقام
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
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
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<Dialpad />}
          >
            تأكيد الرمز
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
