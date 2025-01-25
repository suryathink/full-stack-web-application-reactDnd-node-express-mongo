import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/api/v1/user/login`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Login failed");

      const user = response.data;
      setAuthState({ user, isAuthenticated: true });
      // Show success toast for successful login
      toast.success("Login successful! Welcome back.");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        `Login failed: ${error?.response?.data?.message || error.message}`
      );
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/api/v1/user/signup`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Registration failed");

      const user = response.data.data;
      console.log("user", user);
      setAuthState({ user, isAuthenticated: true });

      // Show success toast for successful registration
      toast.success("User successfully created! Please log in.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(
        `Registration failed: ${
          error?.response?.data?.message || error.message
        }`
      );
    }
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    // TODO API call to log out
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/api/v1/user/reset-password`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Password reset failed");

      // Optionally show a success message after password reset
      toast.success("Password reset successful. Please check your email.");
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(
        `Password reset failed: ${
          error?.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, register, logout, resetPassword }}
    >
      {children}
      <ToastContainer /> {/* Render the ToastContainer component */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
