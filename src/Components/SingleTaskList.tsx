import React, { forwardRef, useEffect, useState } from "react";
import Icon from "./Icons";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import Tasks from "./Tasks";
import { taskListType } from "../Types";
import {
  BE_addTask,
  BE_deleteTaskList,
  BE_saveTaskList,
  getTasksForTaskList,
} from "../Backend/Queries";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { taskListSwitchEditMode } from "../Redux/taskListSlice";

type SingleTaskListPropTypes = { singleTaskList: taskListType };

const SingleTaskList = forwardRef(
  (
    { singleTaskList }: SingleTaskListPropTypes,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    const { id, editMode, tasks, title } = singleTaskList;
    const [homeTitle, setHomeTitel] = useState(title);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [addTaskLoading, setAddTaskLoading] = useState(false);
    const [tasksLoading, setTasksLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      if (id) getTasksForTaskList(dispatch, id, setTasksLoading);
    }, [dispatch, id]);
    const handleSaveTaskListTitle = () => {
      if (id) BE_saveTaskList(dispatch, setSaveLoading, id, homeTitle);
    };
    const checkEnterKey = (theEvent: React.KeyboardEvent<HTMLInputElement>) => {
      if (theEvent.key === "Enter") handleSaveTaskListTitle();
    };
    const handleDelete = () => {
      if (id && tasks) BE_deleteTaskList(id, tasks, dispatch, setDeleteLoading);
    };
    const handleAddTask = () => {
      if (id) BE_addTask(dispatch, id, setAddTaskLoading);
    };
    return (
      <div ref={ref} className="relative">
        <div className="bg-[#d3f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
          <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myYellow bg-opacity-70  p-3 text-white text-center">
            {editMode ? (
              <input
                value={homeTitle}
                onKeyDown={(theEvent) => checkEnterKey(theEvent)}
                onChange={(theEvent) => setHomeTitel(theEvent.target.value)}
                className="flex-1 bg-transparent placeholder-gray-300 px-3 py-1 border-[1px] border-white rounded-md"
                placeholder="Enter Title here"
              />
            ) : (
              <p className="flex-1 text-left md:text-center">{title}</p>
            )}

            <div className="">
              <Icon
                IconName={editMode ? MdSave : MdEdit}
                onClick={() =>
                  editMode
                    ? handleSaveTaskListTitle()
                    : dispatch(taskListSwitchEditMode({ id }))
                }
                loading={editMode && saveLoading}
              />
              <Icon
                IconName={MdDelete}
                onClick={handleDelete}
                loading={deleteLoading}
              />
              <Icon IconName={MdKeyboardArrowDown} />
            </div>
          </div>
          {id && <Tasks tasks={tasks || []} listId={id} />}
        </div>
        <Icon
          IconName={MdAdd}
          onClick={handleAddTask}
          className="absolute -mt-6 -ml-4 p-3 dropshadow-lg hover:bg-myPink"
          reduceOpacityOnHover={false}
          loading={addTaskLoading}
        ></Icon>
      </div>
    );
  }
);

export default SingleTaskList;
