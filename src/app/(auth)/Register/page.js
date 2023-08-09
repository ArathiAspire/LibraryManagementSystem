import React from 'react'

const Register = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96  text-slate-900">
        <h4 className="text-2xl font-semibold mb-4">Sign Up Page</h4>
        <form>
          <div className="mb-4">
            <label className="block font-medium">Enter Name</label>
            <input
              id="username"
              name="username"
              // value={name}
              // onChange={nameHandler}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Enter email</label>
            <input
              id="email"
              name="email"
              // value={email}
              // onChange={emailHandler}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            // onClick={handleLogin}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
   
  );
}

export default Register
