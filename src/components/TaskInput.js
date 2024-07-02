import { Link, useParams, useNavigate } from "react-router-dom";
import "./TaskInput.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { taskActions } from "../store/store";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4

const TaskInput = () => {
  // State to manage task data
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
    isCompleted: false,
  });

  // State to manage editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State to manage submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get task ID from URL params
  const { id } = useParams();

  // Access tasks from Redux store
  const tasks = useSelector((state) => state.task.tasks);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Navigation function from react-router-dom
  const navigate = useNavigate();

  // Effect to set task data when editing an existing task
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      setTaskData((prevData) => ({
        ...prevData,
        ...tasks.find((task) => task.id === id),
      }));
    }
  }, [id, tasks]);

  // Handle form submission
  const handleEventSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Dispatch action based on editing mode
    if (isEditing) {
      dispatch(taskActions.editTask(taskData));
    } else {
      const newTask = {
        ...taskData,
        id: uuidv4(),
      };
      dispatch(taskActions.addTask(newTask));
    }
    setIsEditing(false);
    setTimeout(() => navigate("/"), 2000); // Navigate to home page after 2 seconds
  };

  return (
    <div className="d-flex align-items-center justify-content-center add-task">
      <form
        className="d-flex flex-column align-items-center justify-content-center w-50 add-task-form"
        onSubmit={handleEventSubmit}
      >
        <div className="form-floating mb-3 w-100 mt-3">
          <input
            type="text"
            className="form-control"
            id="floatingTitle"
            placeholder="Title"
            value={taskData.title}
            onChange={(e) =>
              setTaskData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }))
            }
            required
          />
          <label htmlFor="floatingTitle">Title</label>
        </div>
        <div className="form-floating mb-3 w-100">
          <input
            type="text"
            className="form-control"
            id="floatingDescription"
            placeholder="Description"
            value={taskData.description}
            onChange={(e) =>
              setTaskData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
            required
          />
          <label htmlFor="floatingDescription">Description</label>
        </div>
        <div className="form-floating mb-5 w-100">
          <input
            type="date"
            className="form-control"
            id="floatingDate"
            placeholder="Date"
            value={taskData.date}
            onChange={(e) =>
              setTaskData((prevData) => ({ ...prevData, date: e.target.value }))
            }
            required
          />
          <label htmlFor="floatingDate">Due Date</label>
        </div>
        <div className="d-flex align-items-center justify-items-center gap-5">
          <button className="gradient-button" disabled={isSubmitting}>
            {!isSubmitting ? "Submit" : "Submitting..."}
          </button>
          <Link to="/">
            <button type="button" className="gradient-button">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
