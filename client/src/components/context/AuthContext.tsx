import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}api/v1/user/validate-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAuthState({
          user: response.data.data,
          isAuthenticated: true,
        });
      } else {
        localStorage.removeItem("token");
        setAuthState({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Token validation error:", error);
      localStorage.removeItem("token");
      setAuthState({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}api/v1/user/login`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Login failed");

      const { data } = response.data;
      localStorage.setItem("token", data.token);
      setAuthState({
        user: data.user,
        isAuthenticated: true,
      });
      toast.success("Login successful! Welcome back.");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        `Login failed: ${error?.response?.data?.message || error.message}`
      );
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}api/v1/user/signup`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Registration failed");

      const { data } = response.data;
      setAuthState({
        user: data.user,
        isAuthenticated: true,
      });
      toast.success("User successfully created! Please log in.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(
        `Registration failed: ${
          error?.response?.data?.message || error.message
        }`
      );
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ user: null, isAuthenticated: false });
    toast.info("You have been logged out.");
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}api/v1/user/reset-password`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Password reset failed");
      toast.success(
        "Password reset instructions have been sent to your email."
      );
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(
        `Password reset failed: ${
          error?.response?.data?.message || error.message
        }`
      );
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ ...authState, login, register, logout, resetPassword }}
    >
      {children}
      <ToastContainer />
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
