import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import prop-types
import { getAllUsers } from "./ApiUser";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getAllUsers();
        setUsers(userResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers}}>
      {children}
    </UserContext.Provider>
  );
};

// Define prop types for the component
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;