import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

function App() {
  // Create a browser router configuration
  const router = createBrowserRouter([
    { path: "/", element: <TaskList /> }, // Route for displaying task list
    { path: "add-task", element: <TaskInput /> }, // Route for adding a new task
    { path: "edit-task/:id", element: <TaskInput /> }, // Route for editing an existing task
  ]);

  return (
    <Provider store={store}>
      {/* PersistGate to ensure Redux state rehydration from persisted storage */}
      <PersistGate loading={"loading"} persistor={persistor}>
        <div className="bg-image">
          {/* RouterProvider for managing routing with react-router-dom */}
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
