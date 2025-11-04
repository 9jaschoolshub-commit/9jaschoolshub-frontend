import { useState } from "react";
import { Home, ArrowLeft, Map } from "lucide-react";
import { Link } from "react-router-dom";
import SupportModal from "../components/SupportModal";

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // Get current path for display
  const currentPath = window.location.pathname;

  const [isSupportModalOpen, setSupportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-block relative">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Map className="w-16 h-16 text-blue-300 opacity-50" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 mb-2">
          Oops! The page you're looking for doesn't exist.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          The page at{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {currentPath}
          </span>{" "}
          could not be found.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {/* Home Button */}
          <button
            onClick={handleGoHome}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Home className="w-5 h-5 cursor-pointer" />
            Go to Home
          </button>

          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors border-2 border-gray-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Maybe these pages can help
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/courses"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/universities"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Universities
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            If you believe this is a mistake, please{" "}
            <button
              onClick={() => setSupportModalOpen(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              contact support
            </button>
          </p>
        </div>
      </div>

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </div>
  );
}
