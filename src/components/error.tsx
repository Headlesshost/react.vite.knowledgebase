import { isTokenExpired } from "../lib/common";

const Error = ({ message }: { message: string }) => {
  const exToken = isTokenExpired();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">{message}</h1> {/* Change to 404 for a different error */}
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">Oops! You don’t have permission to access this page.</h2>
        <p className="mt-2 text-lg text-gray-600">It seems like you’re lost. Let's get you back home.</p>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <a href="/" className="flex-1 text-center px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow">
            Go Back Home
          </a>
          {!exToken && (
            <a onClick={() => localStorage.clear()} className="flex-1 text-center px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow">
              Log out
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;
