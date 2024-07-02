import { useDispatch, useSelector } from "react-redux";
import "./TaskList.css";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { taskSlice } from "../store/taskSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TaskList = () => {
  // Accessing tasks from Redux store
  const tasks = useSelector((state) => state.task.tasks);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Handle checkbox change for task completion
  const handleCheckboxChange = (id) => {
    dispatch(taskSlice.actions.toggleCompleted({ id }));
  };

  // Handle task deletion
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the task?"
    );
    if (confirmed) {
      dispatch(taskSlice.actions.deleteTask({ id }));
    }
  };

  return (
    <div className="tasks d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center gap-5 mb-5">
        <h1>TO-DO LIST</h1>
        <Link to="/add-task">
          <button className="gradient-button">
            <PostAddOutlinedIcon />
          </button>
        </Link>
      </div>
      {tasks.length > 0 ? (
        <div className="tasks-list">
          <ul>
            {tasks.map((task) => (
              <div
                className="d-flex align-items-center gap-5 task-item mb-3"
                key={task.id}
              >
                <span>
                  <Checkbox
                    checked={task.isCompleted}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                </span>
                <div
                  className={`d-flex flex-column align-items-start ${
                    task.isCompleted ? "isCompleted" : ""
                  }`}
                >
                  <div>{task.title}</div>
                  <div>{task.description}</div>
                  <div>{task.date}</div>
                </div>
                <div className="buttons-container">
                  <Link to={`/edit-task/${task.id}`}>
                    <button className="buttons">
                      <EditIcon />
                    </button>
                  </Link>
                  <button
                    className="buttons"
                    onClick={() => handleDelete(task.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div className="task-item w-50 text-center">
          <p className="text-danger fs-4">No task found</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
