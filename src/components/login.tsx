import { useState } from "react";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [failed, setFailed] = useState("");
  const [disabled, setDisabled] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`https://api.headlesshost.com/sites/${import.meta.env.VITE_CONTENT_SITEID}/token`, {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify({ username, password }), // Convert the data object to a JSON string
    });
    if (!response.ok) {
      console.log("response", response);
      switch (response.status) {
        case 403:
          setFailed("Your account is locked. Please contact the site administrator.");
          setDisabled(true);
          break;
        default:
          setFailed("Login failed");
          break;
      }
    } else {
      const token = await response.text();
      localStorage.setItem("token", token);
      navigate("/"); // Redirect to the home page
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In</h2>
        <div className="mb-3 mt-3">
          {failed.length > 0 ? (
            <div className={`rounded-2xl p-6 bg-red-50`}>
              <div className={`text-grey-800 text-sm`}>
                <p className="whitespace-pre-wrap">{failed}</p>
              </div>
            </div>
          ) : (
            <div className={`rounded-2xl p-6 bg-blue-50`}>
              <div className={`text-grey-800 text-sm`}>
                <p className="whitespace-pre-wrap">Sensitive information will be displayed when signed in.</p>
              </div>
            </div>
          )}
        </div>
        <form className="mt-4" onSubmit={onSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" onChange={() => setFailed("")} id="username" name="username" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" required />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" onChange={() => setFailed("")} id="password" name="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" required />
          </div>
          {!disabled && (
            <div className="flex items-center justify-between">
              <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                Sign In
              </button>
            </div>
          )}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">Don't have an account? You will need to contact the site administrator.</p>
        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to={"/"} className="mt-4 text-center text-sm text-blue-600 hover:underline">
            Return to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
