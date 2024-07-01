import React, { useState } from "react";
import Button from "./button";
import Input from "./input";

type Props = {};

const Login = (props: Props) => {
  const [login, setLogin] = useState(true);
  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center text-4xl mb-9">Login</h1>
      <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
        <Input type="email" name="Email"></Input>
        <Input type="password" name="Password"></Input>
        {!login && <Input type="password" name="Password again"></Input>}

        {login ? (
          <>
            <Button text="Login"></Button>
            <Button
              text="go to the Register page"
              onClick={() => setLogin(false)}
              secondary
            ></Button>
          </>
        ) : (
          <>
            <Button text="Register"></Button>
            <Button
              text="go to the Login page"
              onClick={() => setLogin(true)}
              secondary
            ></Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
