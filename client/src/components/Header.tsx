import React from "react";
import { useAuth } from "../components/context/AuthContext";
import { Menu, X, LogIn, UserPlus, LogOut, User } from "lucide-react";

export default function Header() {
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
            <a href="/" className="flex items-center space-x-2">
              <User className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-800">
                TaskMaster
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {isAuthenticated ? (
              <>
                <a href="/tasks" className="text-gray-600 hover:text-gray-900">
                  Tasks
                </a>
                <a href="/feed" className="text-gray-600 hover:text-gray-900">
                  Feed
                </a>
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
                <a
                  href="/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </a>
                <a
                  href="/register"
                  className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </a>
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
                <a
                  href="/tasks"
                  className="block px-2 py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tasks
                </a>
                <a
                  href="/feed"
                  className="block px-2 py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Feed
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-2 py-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <a
                  href="/login"
                  className="flex items-center space-x-1 px-2 py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </a>
                <a
                  href="/register"
                  className="flex items-center space-x-1 px-2 py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </a>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
