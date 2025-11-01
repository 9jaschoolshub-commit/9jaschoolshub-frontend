/*Todo
Build a decent fallback UI component
This UI will be rendered when there is a runtime error, improving user experience
Should feature a refresh/reload page button, a back button and any other neccessary element
*/
import { AlertTriangle, RefreshCw, ArrowLeft, Home } from 'lucide-react';

export default function FallbackUI({ error }) {
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 rounded-full p-4">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                </div>

                {/* Error Title */}
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
                    Oops! Something went wrong
                </h1>

                {/* Error Description */}
                <p className="text-gray-600 text-center mb-6">
                    We encountered an unexpected error. Don't worry, your data is safe.
                    Try refreshing the page or going back to continue.
                </p>

                {/* Error Details (collapsible) */}
                {error && (
                    <details className="mb-6 bg-gray-50 rounded-lg p-4">
                        <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                            Technical Details
                        </summary>
                        <pre className="mt-3 text-xs text-red-600 overflow-auto">
              {error.toString()}
            </pre>
                    </details>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Refresh Page
                    </button>

                    {/* Back Button */}
                    <button
                        onClick={handleGoBack}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>

                    {/* Home Button */}
                    <button
                        onClick={handleGoHome}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Go to Home
                    </button>
                </div>

                {/* Support Text */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                        If this problem persists, please contact{' '}
                        <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                            support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}