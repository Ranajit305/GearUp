import { useState } from "react";
import { Menu, LogIn, X, Plus, LogOut } from "lucide-react";
import Login from "./Login";
import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - GearUp */}
          <div className="flex items-center">
            <Link to='/' className="text-xl font-bold text-indigo-600">GearUp</Link>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden sm:flex items-center">
            {!user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </button>
            )}
            {user && (
              <div className="flex gap-3">
                <Link to='/products/add'
                  className="inline-flex items-center px-4 py-2 border border-green-500 text-sm font-medium rounded-md text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Link>

                <button
                  onClick={() => logout()}
                  className="inline-flex items-center px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">
                {isMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              {/* Toggle between hamburger and X icon */}
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - conditionally rendered based on state */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
            {!user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </div>
              </button>
            )}
            {user && (
              <Link
                to='/products/add'
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </div>
              </Link>
            )}
            {user && (
              <button
                onClick={() => logout()}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Logout
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {isModalOpen && <Login setIsModalOpen={setIsModalOpen} />}
    </nav>
  );
};

export default Navbar;
