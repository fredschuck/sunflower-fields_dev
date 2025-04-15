import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Icon from "../common/Icon";

const Sidebar = ({ isMobileMenuOpen, closeMobileMenu }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState({
    crops: false,
  });

  const toggleSubmenu = (menu) => {
    setIsExpanded({
      ...isExpanded,
      [menu]: !isExpanded[menu],
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect will be handled by the AuthContext
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Mobile sidebar style when closed
  const mobileStyle = isMobileMenuOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${mobileStyle}`}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link
            to="/dashboard"
            className="flex items-center text-xl font-bold text-green-700"
          >
            <Icon name="wheat" className="h-7 w-7 mr-2" color="#15803d" />
            <span>Farm Manager</span>
          </Link>
          <button
            onClick={closeMobileMenu}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-semibold">
              {user?.displayName?.charAt(0) || "U"}
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">
                {user?.displayName || "User"}
              </div>
              <div className="text-xs text-gray-500">{user?.email || ""}</div>
            </div>
          </div>
        </div>

        {/* Sidebar content/navigation */}
        <nav className="p-4 space-y-1">
          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive("/dashboard")
                ? "bg-green-100 text-green-900"
                : "text-gray-700 hover:bg-green-50 hover:text-green-900"
            }`}
          >
            <Icon
              name="home"
              className={`mr-3 h-5 w-5 ${
                isActive("/dashboard")
                  ? "text-green-700"
                  : "text-gray-500 group-hover:text-green-700"
              }`}
            />
            Dashboard
          </Link>

          {/* Fields */}
          <Link
            to="/dashboard/fields"
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive("/dashboard/fields")
                ? "bg-green-100 text-green-900"
                : "text-gray-700 hover:bg-green-50 hover:text-green-900"
            }`}
          >
            <Icon
              name="field"
              className={`mr-3 h-5 w-5 ${
                isActive("/dashboard/fields")
                  ? "text-green-700"
                  : "text-gray-500 group-hover:text-green-700"
              }`}
            />
            Fields
          </Link>

          {/* Crops with submenu */}
          <div>
            <button
              onClick={() => toggleSubmenu("crops")}
              className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md group ${
                location.pathname.includes("/dashboard/crops")
                  ? "bg-green-100 text-green-900"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-900"
              }`}
            >
              <div className="flex items-center">
                <Icon
                  name="plant"
                  className={`mr-3 h-5 w-5 ${
                    location.pathname.includes("/dashboard/crops")
                      ? "text-green-700"
                      : "text-gray-500 group-hover:text-green-700"
                  }`}
                />
                Crops
              </div>
              <Icon
                name={isExpanded.crops ? "arrowDown" : "arrowRight"}
                className="h-4 w-4 text-gray-500"
              />
            </button>
            {isExpanded.crops && (
              <div className="pl-10 space-y-1 mt-1">
                <Link
                  to="/dashboard/crops/plant"
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                    isActive("/dashboard/crops/plant")
                      ? "bg-green-100 text-green-900"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-900"
                  }`}
                >
                  <Icon
                    name="tree"
                    className={`mr-3 h-4 w-4 ${
                      isActive("/dashboard/crops/plant")
                        ? "text-green-700"
                        : "text-gray-500 group-hover:text-green-700"
                    }`}
                  />
                  Plant
                </Link>
                <Link
                  to="/dashboard/crops/harvest"
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                    isActive("/dashboard/crops/harvest")
                      ? "bg-green-100 text-green-900"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-900"
                  }`}
                >
                  <Icon
                    name="harvest"
                    className={`mr-3 h-4 w-4 ${
                      isActive("/dashboard/crops/harvest")
                        ? "text-green-700"
                        : "text-gray-500 group-hover:text-green-700"
                    }`}
                  />
                  Harvest
                </Link>
              </div>
            )}
          </div>

          {/* Field Notes */}
          <Link
            to="/dashboard/notes"
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive("/dashboard/notes")
                ? "bg-green-100 text-green-900"
                : "text-gray-700 hover:bg-green-50 hover:text-green-900"
            }`}
          >
            <Icon
              name="notes"
              className={`mr-3 h-5 w-5 ${
                isActive("/dashboard/notes")
                  ? "text-green-700"
                  : "text-gray-500 group-hover:text-green-700"
              }`}
            />
            Field Notes
          </Link>

          {/* Weather Tracking */}
          <Link
            to="/dashboard/weather"
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive("/dashboard/weather")
                ? "bg-green-100 text-green-900"
                : "text-gray-700 hover:bg-green-50 hover:text-green-900"
            }`}
          >
            <Icon
              name="cloud"
              className={`mr-3 h-5 w-5 ${
                isActive("/dashboard/weather")
                  ? "text-green-700"
                  : "text-gray-500 group-hover:text-green-700"
              }`}
            />
            Weather Tracking
          </Link>

          {/* Daily Tasks */}
          <Link
            to="/dashboard/tasks"
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive("/dashboard/tasks")
                ? "bg-green-100 text-green-900"
                : "text-gray-700 hover:bg-green-50 hover:text-green-900"
            }`}
          >
            <Icon
              name="calendar"
              className={`mr-3 h-5 w-5 ${
                isActive("/dashboard/tasks")
                  ? "text-green-700"
                  : "text-gray-500 group-hover:text-green-700"
              }`}
            />
            Daily Tasks
          </Link>

          {/* Labor */}
          <Link
            to="/dashboard/labor"
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive("/dashboard/labor")
                ? "bg-green-100 text-green-900"
                : "text-gray-700 hover:bg-green-50 hover:text-green-900"
            }`}
          >
            <Icon
              name="users"
              className={`mr-3 h-5 w-5 ${
                isActive("/dashboard/labor")
                  ? "text-green-700"
                  : "text-gray-500 group-hover:text-green-700"
              }`}
            />
            Labor
          </Link>

          {/* Documents */}
          <Link
            to="/dashboard/documents"
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive("/dashboard/documents")
                ? "bg-green-100 text-green-900"
                : "text-gray-700 hover:bg-green-50 hover:text-green-900"
            }`}
          >
            <Icon
              name="document"
              className={`mr-3 h-5 w-5 ${
                isActive("/dashboard/documents")
                  ? "text-green-700"
                  : "text-gray-500 group-hover:text-green-700"
              }`}
            />
            Documents
          </Link>

          {/* Farmers Market */}
          <Link
            to="/dashboard/market"
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive("/dashboard/market")
                ? "bg-green-100 text-green-900"
                : "text-gray-700 hover:bg-green-50 hover:text-green-900"
            }`}
          >
            <Icon
              name="cart"
              className={`mr-3 h-5 w-5 ${
                isActive("/dashboard/market")
                  ? "text-green-700"
                  : "text-gray-500 group-hover:text-green-700"
              }`}
            />
            Farmers Market
          </Link>
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <Link
              to="/dashboard/settings"
              className="text-gray-600 hover:text-green-700 flex items-center text-sm"
            >
              <Icon name="settings" className="h-4 w-4 mr-2" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-700 flex items-center text-sm"
            >
              <Icon name="logout" className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
