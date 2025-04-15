import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/common/Icon";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <Icon name="wheat" className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-9xl font-extrabold text-green-700 tracking-widest">
          404
        </h1>

        <div className="bg-green-100 px-2 text-sm rounded-full text-green-800 py-1 inline-block mb-6">
          Page Not Found
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Looks like you've wandered into an unplanted field
        </h2>

        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved to another
          location.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-3 bg-white rounded-md text-green-700 border border-green-600 font-medium hover:bg-green-50 transition-colors duration-200 flex items-center justify-center"
          >
            <Icon name="home" className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>

          <Link
            to="/dashboard"
            className="px-5 py-3 bg-green-600 rounded-md text-white font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Icon name="field" className="w-5 h-5 mr-2" />
            Return to Dashboard
          </Link>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="mailto:support@farmmanager.com"
              className="text-green-600 hover:text-green-800"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-20 hidden lg:block">
        <Icon name="plant" className="h-32 w-32 text-green-300" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 hidden lg:block">
        <Icon name="tree" className="h-32 w-32 text-green-300" />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-10 hidden lg:block">
        <Icon name="tractor" className="h-24 w-24 text-green-300" />
      </div>
      <div className="absolute bottom-1/3 left-1/4 opacity-10 hidden lg:block">
        <Icon name="field" className="h-24 w-24 text-green-300" />
      </div>
    </div>
  );
};

export default NotFound;
