import { useEffect, useState } from 'react';
import './Tasks.css';
import { getAllTasks, addTask, deleteTask } from './ApiTask';
import { getAllTrackers, addTracker, deleteTracker, updateTracker } from './ApiTracker';
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ id_user: 1, name: '', description: '', is_predefined: false });
  const [trackers, setTrackers] = useState([]);
  const [newTracker, setNewTracker] = useState({ id_task: 0, date: '', duration: 0, is_completed: false });
  const [menuVisible, setMenuVisible] = useState(false);
  const [durationsUpdated, setDurationsUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user inside useEffect to make it local to the component
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      const fetchData = async () => {
        await fetchTasks(loggedInUser);
        await fetchTrackers();
      };
      fetchData();
    } else {
      console.error("No logged-in user found.");
    }
  }, []); 
  
  
  useEffect(() => {
    console.log("Updated trackers state:", trackers);
  }, [trackers]);
  

  // Fetch tasks from the API
  const fetchTasks = async (loggedInUser) => {

    if (!loggedInUser) return;

    try {
      const response = await getAllTasks();
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const filteredTasks = response.data.filter(
        (task) => task.id_user === loggedInUser.id || task.is_predefined === true
      );
      setTasks(filteredTasks);
      console.log("Tasks fetched from backend:", response.data);
      console.log("Filtered tasks fetched from backend:", filteredTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  // Fetch trackers from the API
  // Fetch trackers and then update durations
  const fetchTrackers = async () => {
    try {
      const response = await getAllTrackers();
      setTrackers(response.data);
      console.log("Trackers fetched:", response.data);

      // Update durations after fetching trackers
      if (!durationsUpdated) {
        updateTrackerDurations(response.data);
        setDurationsUpdated(true); // Set flag to prevent further updates
      }
    } catch (error) {
      console.error("Failed to fetch trackers:", error);
    }
  };

  // Calculate completion date based on duration
  const calculateCompletionDate = (duration) => {
    if (!duration || isNaN(duration)) return '';
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + parseInt(duration, 10));
    return currentDate.toISOString().split('T')[0];
  };

  // Add a new task and return its ID
  const handleAddTask = async () => {
    // Get logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
      console.error('No logged-in user found');
      return;
    }

    // Update the newTask with the logged-in user's id
    const taskWithUser = { ...newTask, id_user: loggedInUser.id };

    try {
      await addTask(taskWithUser);
      const response = await getAllTasks();
      const addedTask = response.data.find(
        (task) =>
          task.name === newTask.name && task.description === newTask.description
      );
      setNewTask({ id_user: loggedInUser.id, name: '', description: '', is_predefined: false });
      return addedTask ? addedTask.id : null;
    } catch (error) {
      console.error('Failed to add task:', error);
      return null;
    }
  };

  // Add a new tracker
  const handleAddTracker = async (taskId) => {
    try {
      const trackerData = { ...newTracker, id_task: taskId };
      if (trackerData.id_task && trackerData.duration > 0) {
        await addTracker(trackerData);
        fetchTrackers();
        setNewTracker({ id_task: 0, date: '', duration: 0, is_completed: false });
      } else {
        console.error('Invalid tracker data.');
      }
    } catch (error) {
      console.error('Failed to add tracker:', error);
    }
  };

  // Delete a task and its related tracker
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleDeleteTracker = async (id) => {
    try {
      await deleteTracker(id);
      fetchTrackers();
    } catch (error) {
      console.error('Failed to delete tracker:', error);
    }
  };

  // Update tracker durations dynamically
  const updateTrackerDurations = (fetchedTrackers) => {
    const updatedTrackers = fetchedTrackers.map((tracker) => {
      const createdDate = new Date(tracker.date); // The original creation date
      const today = new Date();
      const remainingDays = Math.max(
        0,
        tracker.duration - Math.floor((today - createdDate) / (1000 * 60 * 60 * 24))
      );
      return { ...tracker, duration: remainingDays };
    });
  
    // Update the state with the computed trackers
    setTrackers(updatedTrackers);
  
    // Optionally persist changes in the backend
    updatedTrackers.forEach(async (tracker) => {
      try {
        await updateTracker(tracker.id, tracker);
        console.log("Updated tracker in backend:", tracker);
      } catch (error) {
        console.error("Failed to update tracker duration in backend:", error);
      }
    });
  };

  const handleCheckboxChange = async (tracker) => {
    try {
      const updatedTracker = { ...tracker, is_completed: !tracker.is_completed };
      await updateTracker(tracker.id, updatedTracker);
      setTrackers((prev) =>
        prev.map((t) => (t.id === tracker.id ? updatedTracker : t))
      );
    } catch (error) {
      console.error('Failed to update tracker:', error);
    }
  };

  // Toggle menu visibility
  const toggleMenu = () => setMenuVisible(!menuVisible);

 // Check if tasks or trackers are still being fetched
  if (tasks === null || trackers === null) {
    return <div>Loading...</div>;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };


  return (
    <div className="home-page">
      <div className="menu-button" onClick={toggleMenu}>
        <div className="menu-box"></div>
        <div className="menu-box"></div>
        <div className="menu-box"></div>
      </div>

      {menuVisible && (
        <div className="menu">
          <ul>
            <li>
            <button onClick={() => handleNavigation("/home")}>
              Home Page
            </button>
            </li>
            <li>
            <button onClick={() => handleNavigation("/info")}>
              Info Point
            </button>
            </li>
            <li>
            <button onClick={() => handleNavigation("/journal")}>
              Journal
            </button>
            </li>
          </ul>
        </div>
      )}

      <div className="tasks">My tasks</div>
      <div className="rectangle-23"></div>

      {tasks.map((task) => {
        const relatedTracker = trackers.find((t) => t.id_task === task.id);
        return (
          <div key={task.id} className="rectangle-28">
            <span>{task.name}</span>
            <span>{task.description}</span>
            <span>{relatedTracker ? `Duration: ${relatedTracker.duration} days` : 'No tracker'}</span>
            {relatedTracker && (
              <label>
                <input
                  type="checkbox"
                  checked={relatedTracker.is_completed}
                  onChange={() => handleCheckboxChange(relatedTracker)}
                />
                Completed
              </label>
            )}
            <button
              onClick={async () => {
                await Promise.all([
                  handleDeleteTask(task.id),
                  relatedTracker && handleDeleteTracker(relatedTracker.id),
                ]);
              }}
              className="delete-task-button"
            >
              X
            </button>
          </div>
        );
      })}

      <input
        type="text"
        placeholder="Task Name"
        className="task-input"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
      />

      <input
        type="text"
        value={newTask.description}
        placeholder="Description"
        className="task-input"
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />

      <input
        id="duration-input"
        type="number"
        value={newTracker.duration}
        placeholder="Days"
        className="task-input"
        onChange={(e) => {
          const duration = parseInt(e.target.value, 10);
          setNewTracker((prev) => ({
            ...prev,
            duration,
            date: calculateCompletionDate(duration),
          }));
        }}
      />

      <button className="rectangle-28"
        onClick={async () => {
          const taskId = await handleAddTask();
          if (taskId) {
            await handleAddTracker(taskId);
          }
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export default Tasks;