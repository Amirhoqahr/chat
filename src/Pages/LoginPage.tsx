import React from "react";
import Input from "../Components/input";
import Button from "../Components/button";
import Login from "../Components/Login";

const LoginPage = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Login></Login>
      <div className="w-full h-full bg-gradient-to-r from-myBlue to-myPink absolute -z-10"></div>
      <div className="w-full h-full bg-pattern opacity-50 absolute -z-10"></div>
    </div>
  );
};

export default LoginPage;
