import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./components/context/AuthContext";
import Header from "./components/Header";
import TaskBoard from "./components/tasks/TaskBoard";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import Feed from "./components/feeds/feed";

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                      <h1 className="text-4xl font-bold text-gray-800">
                        Welcome
                      </h1>
                      <p className="text-gray-600 mt-2">
                        Please sign in to continue
                      </p>
                    </div>
                    <LoginForm />
                    <div className="text-center space-y-2">
                      <p className="text-gray-600">
                        Don't have an account?{" "}
                        <a
                          href="/register"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Register
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a
                          href="/forgot-password"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Forgot Password?
                        </a>
                      </p>
                    </div>
                  </div>
                )
              }
            />

            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                      <h1 className="text-4xl font-bold text-gray-800">
                        Register
                      </h1>
                      <p className="text-gray-600 mt-2">Create your account</p>
                    </div>
                    <RegisterForm />
                    <p className="text-center text-gray-600 mt-4">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Login
                      </a>
                    </p>
                  </div>
                )
              }
            />

            <Route
              path="/forgot-password"
              element={
                isAuthenticated ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                      <h1 className="text-4xl font-bold text-gray-800">
                        Reset Password
                      </h1>
                      <p className="text-gray-600 mt-2">
                        We'll help you reset your password
                      </p>
                    </div>
                    <ForgotPasswordForm />
                    <p className="text-center text-gray-600 mt-4">
                      Remember your password?{" "}
                      <a
                        href="/login"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Login
                      </a>
                    </p>
                  </div>
                )
              }
            />

            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TaskBoard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
