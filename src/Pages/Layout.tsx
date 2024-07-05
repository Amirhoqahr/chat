import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
