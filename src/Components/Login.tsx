import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import { BE_signIn, BE_signUp } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
const dispatch = useDispatch<AppDispatch>();

type Props = {};

const Login = (props: Props) => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const goTo = useNavigate();
  const LoginButtonFunction = () => {
    BE_signIn(email, password, setSignUpLoading, reset, goTo, dispatch);
  };
  const RegisterButtonFunction = () => {
    BE_signUp(
      email,
      password,
      confirmPassword,
      setSignUpLoading,
      reset,
      goTo,
      dispatch
    );
  };
  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
            <Button
              text="Login"
              onClick={LoginButtonFunction}
              loading={signUpLoading}
            ></Button>
            <Button
              text="go to the Register page"
              onClick={() => setLogin(false)}
              secondary
            ></Button>
          </>
        ) : (
          <>
            <Button
              text="Register"
              onClick={RegisterButtonFunction}
              loading={signUpLoading}
            ></Button>
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
