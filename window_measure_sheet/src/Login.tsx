import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Top-left image */}
      <img
        src="/login-background-2.png"
        alt="Top-left background"
        className="absolute h-[250px] top-[-4rem] left-[-1rem] sm:-top-32 sm:-left-7 sm:h-auto"
      />

      {/* Bottom-right image */}
      <img
        src="/login-background-1.png"
        alt="Bottom-right background"
        className="absolute h-[300px] right-[-4.75rem] bottom-[-5.1rem] sm:-bottom-48 sm:-right-44 sm:h-[700px]"
      />

      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg z-10">
        <img src="/wmsLogo.png" alt="WMS Logo" className='w-[300px] sm:w-auto -mb-10 -mt-14 sm:-mb-14' />
        <h2 className="text-2xl font-bold mb-10">Login</h2>

        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
