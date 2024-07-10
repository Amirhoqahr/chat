import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import { BE_signUp } from "../Backend/Queries";

type Props = {};

const Login = (props: Props) => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const LoginButtonFunction = () => {
    // BE_signUp(email, password, confirmPassword);
  };
  const RegisterButtonFunction = () => {
    BE_signUp(email, password, confirmPassword);
  };
  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center text-4xl mb-9">Login</h1>
      <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
        <Input
          type="email"
          name="Email"
          value={email}
          onChange={(theInput) => setEmail(theInput.target.value)}
        ></Input>
        <Input
          type="password"
          name="Password"
          value={password}
          onChange={(theInput) => setPassword(theInput.target.value)}
        ></Input>
        {!login && (
          <Input
            type="password"
            name="Password again"
            value={confirmPassword}
            onChange={(theInput) => setConfirmPassword(theInput.target.value)}
          ></Input>
        )}

        {login ? (
          <>
            <Button text="Login" onClick={LoginButtonFunction}></Button>
            <Button
              text="go to the Register page"
              onClick={() => setLogin(false)}
              secondary
            ></Button>
          </>
        ) : (
          <>
            <Button text="Register" onClick={RegisterButtonFunction}></Button>
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
