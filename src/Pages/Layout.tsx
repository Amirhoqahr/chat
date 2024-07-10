import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className="bg-pattern flex-1 max-h-[90%] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}
