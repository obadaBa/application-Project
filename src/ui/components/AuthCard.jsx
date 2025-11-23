// src/ui/components/AuthCard.jsx
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export default function AuthCard({ children }) {
  return (
    <MotionPaper
      // نفس الـ id بكل الصفحات لحتى Framer يعمل transition بينها
      layoutId="auth-card"
      layout
      elevation={3}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 420,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      transition={{
        layout: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      {children}
    </MotionPaper>
  );
}
