import { useState, useEffect } from "react";
import { useAuth } from "./components/context/AuthContext";
import Header from "./components/Header";
import TaskBoard from "./components/tasks/TaskBoard";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";

function App() {
  const [currentView, setCurrentView] = useState<
    "login" | "register" | "forgot-password"
  >("login");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Reset view to login when logging out
    if (!isAuthenticated) {
      setCurrentView("login");
    }
  }, [isAuthenticated]);

  const renderAuthView = () => {
    switch (currentView) {
      case "register":
        return (
          <div>
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
          </div>
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {isAuthenticated ? (
          <TaskBoard />
        ) : (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
              <p className="text-gray-600 mt-2">Please sign in to continue</p>
            </div>
            {renderAuthView()}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
