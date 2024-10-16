import React from "react";
import logo from "../Assets/img/logo.png";
import Button from "./button";
import AddListBoard from "./AddListBoard";
import Icon from "./Icons";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import UserHeaderProfile from "./UserHeaderProfile";

type Props = {};

function Header({}: Props) {
  return (
    <div className="flex fles-wrap sm:flex-row gap-5 items-center justify-between bg-gradient-to-r from-violet-500 border-t-orange-500 px-5 py-5 md:py-2">
      <img
        src={logo}
        alt="img not found"
        className="w-[50px] drop-shadow-md cursor-pointer"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        <AddListBoard />
        <Icon IconName={BsFillChatFill} ping={true} />
        <Icon IconName={FiList} />
        <UserHeaderProfile />
      </div>
    </div>
  );
}

export default Header;
