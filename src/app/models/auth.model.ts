export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  phone: string;
  password: string;
  reEnterPassword: string;
}

export interface AuthUser {
  id?: string | number;
  name: string;
  email: string;
  phone?: string;
  userName?: string;
  role?: string;
}

export type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

export interface AuthResult {
  success: boolean;
  message?: string;
  resetToken?: string;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  jwt?: string;
  message?: string;
  userId?: string | number;
  userName?: string;
  role?: string;
  user?: Record<string, unknown>;
  data?: {
    token?: string;
    accessToken?: string;
    user?: Record<string, unknown>;
    userId?: string | number;
    userName?: string;
    role?: string;
  };
  [key: string]: unknown;
}
