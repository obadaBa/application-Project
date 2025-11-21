import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const LoginPage = lazy(() => import("../ui/pages/Login/loginPage"));
const ForgotPasswordPage = lazy(() =>
  import("../ui/pages/ForgotPassword/ForgotPasswordPage")
);
const OtpVerificationPage = lazy(() =>
  import("../ui/pages/Otp/OtpVerificationPage")
);
const ResetPasswordPage = lazy(() =>
  import("../ui/pages/ResetPassword/ResetPasswordPage")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/verify-code",
    element: <OtpVerificationPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
]);
