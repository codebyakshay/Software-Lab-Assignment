export interface ApiResponse {
  success: string | boolean;
  message: string;
}

export interface LoginResponse extends ApiResponse {
  token?: string;
  name?: string;
  email?: string;
}

export interface RegisterResponse extends ApiResponse {
  token?: string;
}

export interface ForgotPasswordRequest {
  mobile: string;
}

export interface ForgotPasswordResponse extends ApiResponse {}

export interface VerifyOtpRequest {
  otp: string;
}

export interface VerifyOtpResponse extends ApiResponse {
  token?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  cpassword: string;
}

export interface ResetPasswordResponse extends ApiResponse {
  is_verified?: string | boolean;
}

export interface LoginRequest {
  email: string;
  password?: string;
  role: "farmer" | "consumer";
  device_token: string;
  type: "email" | "facebook" | "google" | "apple";
  social_id: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone: string;
  password?: string;
  role: "farmer" | "consumer";
  business_name: string;
  informal_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: number;
  registration_proof: string;
  business_hours: {
    mon?: string[];
    tue?: string[];
    wed?: string[];
    thu?: string[];
    fri?: string[];
    sat?: string[];
    sun?: string[];
  };
  device_token: string;
  type: "email" | "facebook" | "google" | "apple";
  social_id: string;
}
