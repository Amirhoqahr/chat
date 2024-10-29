import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { BE_signOut, getStorageUser } from "../Backend/Queries";
import Spinner from "./Spinner";
import { setUser } from "../Redux/userSlice";

type Props = {};

function Header({}: Props) {
  const goTo = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dispatch = useDispatch();
  // get the current User from Redux
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const usr = getStorageUser();
  useEffect(() => {
    if (usr?.id) {
      dispatch(setUser(usr));
    } else {
      goTo("/auth");
    }
  }, [dispatch, goTo]);

  useEffect(() => {
    const page = getCurrentPage();
    if (page) goTo("/dashboard/" + page);

    // const get = async () => {
    //   if (usr?.id) await BE_getChats(dispatch);
    // };
    // get();
  }, [goTo]);

  const handleSignOut = () => {
    BE_signOut(dispatch, goTo, setLogoutLoading);
  };

  const getCurrentPage = () => {
    return localStorage.getItem("superhero-page");
  };
  const setCurrentPage = (page: string) => {
    localStorage.setItem("superhero-page", page);
  };
  const handleGoToPage = (page: string) => {
    goTo("/dashboard/" + page);
    setCurrentPage(page);
  };

  return (
    <div className="flex fles-wrap z-10 sm:flex-row gap-5 items-center justify-between bg-gradient-to-r from-violet-500 border-t-orange-500 px-5 py-5 md:py-2">
      <img
        src={logo}
        alt="img not found"
        className="w-[50px] drop-shadow-md cursor-pointer"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        {getCurrentPage() === "chat" ? (
          <Icon
            IconName={FiList}
            onClick={() => handleGoToPage("list")}
            reduceOpacityOnHover={false}
          />
        ) : getCurrentPage() === "profile" ? (
          <>
            <Icon
              reduceOpacityOnHover={false}
              IconName={FiList}
              onClick={() => handleGoToPage("list")}
            />
            <Icon
              IconName={BsFillChatFill}
              ping={false}
              onClick={() => handleGoToPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        ) : (
          <>
            <AddListBoard />
            <Icon
              IconName={BsFillChatFill}
              ping={false}
              onClick={() => handleGoToPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        )}
        <div className="group relative">
          {currentUser && <UserHeaderProfile user={currentUser} />}
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1 pb-1">
              <p
                onClick={() => {
                  handleGoToPage("profile");
                }}
                className="block hover:bg-gray-200 py-2 px-4 hover:cursor-pointer"
              >
                Profile
              </p>
              <span
                onClick={() => !logoutLoading && handleSignOut()}
                className={`hover:bg-gray-200 py-2 px-4 flex items-center gap-4 hover:cursor-pointer`}
              >
                Log out
                {logoutLoading && <Spinner />}
              </span>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
