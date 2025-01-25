import React, { useState } from "react";
// import { AuthProvider } from "./context/AuthContext";
import { AuthProvider } from "./components/context/AuthContext";
import Header from "./components/Header";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";

function App() {
  const [currentView, setCurrentView] = useState<
    "login" | "register" | "forgot-password"
  >("login");

  const renderView = () => {
    switch (currentView) {
      case "register":
        return (
          <>
            <RegisterForm />
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setCurrentView("login")}
                className="text-blue-500 hover:text-blue-700"
              >
                Login
              </button>
            </p>
          </>
        );
      case "forgot-password":
        return (
          <>
            <ForgotPasswordForm />
            <p className="text-center text-gray-600">
              Remember your password?{" "}
              <button
                onClick={() => setCurrentView("login")}
                className="text-blue-500 hover:text-blue-700"
              >
                Login
              </button>
            </p>
          </>
        );
      default:
        return (
          <>
            <LoginForm />
            <div className="text-center space-y-2">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => setCurrentView("register")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Register
                </button>
              </p>
              <p className="text-gray-600">
                <button
                  onClick={() => setCurrentView("forgot-password")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="flex flex-col items-center justify-center p-4 mt-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
              <p className="text-gray-600 mt-2">Please sign in to continue</p>
            </div>
            {renderView()}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
