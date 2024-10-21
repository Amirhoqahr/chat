import React from "react";
import Icon from "./Icons";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";

type Props = {};

function SingleTaskList({}: Props) {
  return (
    <div className="relative">
      <div className="bg-white w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
        <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myYellow bg-opacity-70  p-3 text-white text-center">
          <p>Task Text Here</p>
          <div className="">
            <Icon IconName={MdEdit} reduceOpacityOnHover />
            <Icon IconName={MdDelete} reduceOpacityOnHover />
            <Icon IconName={MdKeyboardArrowDown} reduceOpacityOnHover />
          </div>
        </div>
      </div>
      <Icon
        IconName={MdAdd}
        className="absolute -mt-6 -ml-4 p-2 dropshadow-lg hover:bg-myPink"
      ></Icon>
    </div>
  );
}

export default SingleTaskList;
