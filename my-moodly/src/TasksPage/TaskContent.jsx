import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import prop-types
import { getAllTasks } from './ApiTask';
import { getAllTrackers } from './ApiTracker';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await getAllTasks();
        setTasks(taskResponse.data);

        const trackerResponse = await getAllTrackers();
        setTrackers(trackerResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, trackers, setTrackers }}>
      {children}
    </TaskContext.Provider>
  );
};

// Define prop types for the component
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskProvider;
