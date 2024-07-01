import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-blue-600 h-[100vh] flex items-center justify-center">
      {/* login */}
      <div className="w-full md:w-[450px]">
        <h1 className="text-white text-center text-4xl mb-9">Login</h1>
        <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
          <input
            type="text"
            placeholder="Enter Name: "
            className="flex-1 placeholder-gray-300 px-3 py-2 bg-transparent border-2 border-gray-400 rounded-full"
          ></input>
          <input
            type="text"
            placeholder="Enter Name: "
            className="flex-2 placeholder-gray-300 px-3 py-2 bg-transparent border-2 border-gray-400 rounded-full"
          ></input>
          <input
            type="text"
            placeholder="Enter Name: "
            className="flex-3 placeholder-gray-300 px-3 py-2 bg-transparent border-2 border-gray-400 rounded-full"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
