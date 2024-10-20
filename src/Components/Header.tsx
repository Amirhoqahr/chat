import React, { useState } from "react";
import logo from "../Assets/img/logo.png";
import Button from "./button";
import AddListBoard from "./AddListBoard";
import Icon from "./Icons";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { start } from "repl";
import { RootState } from "../Redux/store";
import { Link, useNavigate } from "react-router-dom";
import { BE_signOut } from "../Backend/Queries";
import Spinner from "./Spinner";

type Props = {};

function Header({}: Props) {
  const goTo = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    BE_signOut(dispatch, setLogoutLoading);
  };

  const setCurrentPage = (page: string) => {
    localStorage.setItem("superhero-page", page);
  };
  const getCurrentPage = () => {
    return localStorage.getItem("superhero-page");
  };
  const handleGoToPage = (page: string) => {
    goTo("/dashboard/" + page);
    setCurrentPage(page);
  };

  // get the current User from Redux
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className="flex fles-wrap sm:flex-row gap-5 items-center justify-between bg-gradient-to-r from-violet-500 border-t-orange-500 px-5 py-5 md:py-2">
      <img
        src={logo}
        alt="img not found"
        className="w-[50px] drop-shadow-md cursor-pointer"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        {getCurrentPage() === "chat" ? (
          <Icon
            IconName={FiList}
            onClick={() => {
              handleGoToPage("list");
            }}
          />
        ) : getCurrentPage() === "profile" ? (
          <>
            {/* fragment cuz we have 2 elements to put in */}
            <Icon
              IconName={FiList}
              onClick={() => {
                handleGoToPage("list");
              }}
            />
            <Icon
              IconName={BsFillChatFill}
              ping={true}
              onClick={() => {
                handleGoToPage("chat");
              }}
            />
          </>
        ) : (
          <>
            {/* fragment cuz we have 3 elements to put in */}
            <AddListBoard />
            <Icon
              IconName={BsFillChatFill}
              ping={true}
              onClick={() => {
                handleGoToPage("chat");
              }}
            />
            <Icon
              IconName={FiList}
              onClick={() => {
                handleGoToPage("list");
              }}
            />
          </>
        )}
        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1 pb-1">
              <p
                onClick={() => {
                  handleGoToPage("/profile");
                }}
                className="block hover:bg-gray-200 py-2 px-4 hover:cursor-pointer"
              >
                Profile
              </p>
              <Link
                to={"/"}
                onClick={() => !logoutLoading && handleSignOut()}
                className={`hover:bg-gray-200 py-2 px-4 flex items-center gap-4`}
              >
                Log out
                {logoutLoading && <Spinner />}
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
