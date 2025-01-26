import React from "react";
import { useAuth } from "./context/AuthContext";
import { Menu, X, LogIn, UserPlus, LogOut, User } from "lucide-react";

interface HeaderProps {
  onNavigate: (view: "login" | "register" | "forgot-password") => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("login")}
              className="flex items-center space-x-2"
            >
              <User className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-800">
                TaskMaster
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {isAuthenticated ? (
              <>
                <button className="text-gray-600 hover:text-gray-900">
                  Tasks
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  Feed
                </button>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {user?.name ? getInitial(user.name) : "U"}
                    </div>
                    <span className="text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate("login")}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => onNavigate("register")}
                  className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden pb-4">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 px-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {user?.name ? getInitial(user.name) : "U"}
                    </div>
                    <span className="text-gray-700">{user?.name}</span>
                  </div>
                </div>
                <button
                  className="block px-2 py-2 text-gray-600 hover:text-gray-900 w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tasks
                </button>
                <button
                  className="block px-2 py-2 text-gray-600 hover:text-gray-900 w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Feed
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-2 py-2 text-gray-600 hover:text-gray-900 w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    onNavigate("login");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-1 px-2 py-2 text-gray-600 hover:text-gray-900 w-full"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate("register");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-1 px-2 py-2 text-gray-600 hover:text-gray-900 w-full"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
