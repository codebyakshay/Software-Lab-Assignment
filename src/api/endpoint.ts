export const BASE_URL = "https://sowlab.com/assignment";

export const ENDPOINT = {
  // Authentication
  REGISTER: "/user/register",
  LOGIN: "/user/login",
  
  // Password Recovery
  FORGOT_PASSWORD: "/user/forget-password",
  VERIFY_OTP: "/user/verify-otp",
  RESET_PASSWORD: "/user/reset-password",
} as const;
