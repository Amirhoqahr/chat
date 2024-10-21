import React from "react";
import Icon from "./Icons";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import Tasks from "./Tasks";

type Props = {};

function SingleTaskList({}: Props) {
  return (
    <div className="relative">
      <div className="bg-[#d3f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
        <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myYellow bg-opacity-70  p-3 text-white text-center">
          <p>Task Text Here</p>
          <div className="">
            <Icon IconName={MdEdit} />
            <Icon IconName={MdDelete} />
            <Icon IconName={MdKeyboardArrowDown} />
          </div>
        </div>
        <Tasks />
      </div>
      <Icon
        IconName={MdAdd}
        className="absolute -mt-6 -ml-4 p-3 dropshadow-lg hover:bg-myPink"
        reduceOpacityOnHover={false}
        loading
      ></Icon>
    </div>
  );
}

export default SingleTaskList;
