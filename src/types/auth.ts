export interface User {
    id: string;
    phone: string;
    first_name: string;
    last_name: string;
    type: 'admin' | 'member' | 'customer';
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface OTPResponse {
    success: boolean;
    message: string;
    otpId?: string;
  }
  
  export interface VerifyOTPResponse {
    success: boolean;
    message: string;
    user?: User;
  }
  
  