import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from '../TasksPage/TaskContent.jsx';

function HomePage() {
  const { tasks, trackers } = useContext(TaskContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Get the logged-in user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Filter completed tasks based on the logged-in user and predefined status
  const completedTasks = tasks.filter((task) => {
    if (!loggedInUser) return false; // Ensure user is logged in
    const relatedTracker = trackers.find((tracker) => tracker.id_task === task.id);
    return (task.id_user === loggedInUser.id || task.is_predefined === true) && relatedTracker?.is_completed;
  });

  // Filter unsolved tasks based on the logged-in user and predefined status
  const unsolvedTasks = tasks.filter((task) => {
    if (!loggedInUser) return false; // Ensure user is logged in
    const relatedTracker = trackers.find((tracker) => tracker.id_task === task.id);
    return (task.id_user === loggedInUser.id || task.is_predefined === true) && (!relatedTracker || !relatedTracker.is_completed);
  });

  return (
    <div className="tasks-page">
      <div className="background">
        <div className="tasks-header">
          <h1>Home</h1>
        </div>

        <div className="tasks-content">
          <div className="completed-tasks">
            <h3>Completed Tasks</h3>
            <ul>
              {completedTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              ))}
            </ul>
          </div>

          <div className="unsolved-tasks">
            <div className="unsolved-tasks-header">
              <h3>Unsolved Tasks</h3>
              <button
                className="add-task-button"
                onClick={() => handleNavigation("/tasks")}
              >
                +
              </button>
            </div>
            <ul>
              {unsolvedTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
