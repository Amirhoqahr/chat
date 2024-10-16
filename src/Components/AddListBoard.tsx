import React from "react";
import Button from "./button";
import Icon from "./Icons";
import { MdAdd } from "react-icons/md";

const AddListBoard = () => {
  return (
    // باید رترن یه المنت اچ‌تی‌ام‌ال توی این علامت گذاشته بشه
    <>
      <Button text="Add new ListBoard" className="hidden md:flex" />
      <Icon IconName={MdAdd} className="block md:hidden" />
    </>
  );
};

export default AddListBoard;
