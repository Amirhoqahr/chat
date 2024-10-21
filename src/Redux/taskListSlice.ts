import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../Types";

export const defaultTaskList: taskListType = {
  title: "sample task list",
};
export const defaultTask: taskType = {
  title: "Do it at 9 am",
  description: "description here",
};

type taskListSliceType = {
  currentTaskList: taskListType[];
};
const initialState = { currentTaskList: [] };
const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, action) => {},
    addTaskList: (state, action) => {},
  },
});

export const { setTaskList, addTaskList } = taskListSlice.actions;
export default taskListSlice.reducer;