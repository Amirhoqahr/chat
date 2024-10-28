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
const initialState: taskListSliceType = { currentTaskList: [] };
const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.currentTaskList = action.payload;
    },
    addTaskList: (state, action) => {
      const newTaskList = action.payload;
      newTaskList.editMode = true;
      newTaskList.tasks = [];
      state.currentTaskList.unshift(newTaskList);
    },
    saveTaskListTitle: (state, action) => {
      const { id, title } = action.payload;
      state.currentTaskList = state.currentTaskList.map((tL) => {
        if (tL.id === id) {
          tL.title = title;
          tL.editMode = false;
        }
        return tL;
      });
    },
    taskListSwitchEditMode: (state, action) => {
      const { id, value } = action.payload;
      console.log(id);
      state.currentTaskList = state.currentTaskList.map((tL) => {
        if (tL.id === id) {
          tL.editMode = value !== undefined ? value : true;
        }
        return tL;
      });
    },
  },
});

export const {
  setTaskList,
  addTaskList,
  saveTaskListTitle,
  taskListSwitchEditMode,
} = taskListSlice.actions;
export default taskListSlice.reducer;
