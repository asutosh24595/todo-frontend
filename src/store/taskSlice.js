import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action) {
      const {id} = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    editTask(state, action) {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    toggleCompleted(state, action) {
      const {id} = action.payload;
      const task = state.tasks.find(task=>task.id===id);
      if(task){
        task.isCompleted = !task.isCompleted;
      }
    },
  },
});
