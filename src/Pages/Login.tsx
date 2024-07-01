import React from "react";
import Input from "../Components/input";

const LoginPage = () => {
  return (
    <div className="bg-blue-600 h-[100vh] flex items-center justify-center">
      {/* login */}
      <div className="w-full md:w-[450px]">
        <h1 className="text-white text-center text-4xl mb-9">Login</h1>
        <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
          <Input type="email" name="Email"></Input>
          <Input type="password" name="Password"></Input>
          <Input type="password" name="Password again"></Input>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
