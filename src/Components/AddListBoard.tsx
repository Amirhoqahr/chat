import React, { useState } from "react";
import Button from "./button";
import Icon from "./Icons";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { BE_addTaskList } from "../Backend/Queries";

const AddListBoard = () => {
  const [addLoading, setAddLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleAddTaskList = () => {
    BE_addTaskList(dispatch, setAddLoading);
  };
  return (
    // باید رترن یه المنت اچ‌تی‌ام‌ال توی این علامت گذاشته بشه
    <>
      <Button
        text="Add new ListBoard"
        onClick={handleAddTaskList}
        className="hidden md:flex"
        loading={addLoading}
      />
      <Icon
        IconName={MdAdd}
        onClick={handleAddTaskList}
        className="block md:hidden"
        loading={addLoading}
      />
    </>
  );
};

export default AddListBoard;
