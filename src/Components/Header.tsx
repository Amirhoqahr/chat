import React from "react";
import logo from "../Assets/img/logo.png";
import Button from "./button";
type Props = {};

function Header({}: Props) {
  return (
    <div className="flex fles-wrap sm:flex-row gap-5 items-center justify-between bg-gradient-to-r from-violet-500 border-t-orange-500 px-5 py-5 md:py-2">
      <img
        src={logo}
        alt="img not found"
        className="w-[50px] drop-shadow-md cursor-pointer"
      />
      <Button text="Add new ListBoard"></Button>
    </div>
  );
}

export default Header;
