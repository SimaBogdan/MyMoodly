import { useEffect, useState } from 'react';
import styles from "./SignUp.module.css";
import { Link } from 'react-router-dom';
import { getAllUsers, addUser } from "./ApiUser";

function SignUp() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };

    fetchData();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      console.log("Users fetched from backend:", response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const validateInputs = () => {
    const { name, username, password, confirm_password } = newUser;

    if (!name || !username || !password || !confirm_password) {
      setError('All fields are required.');
      return false;
    }
    if (users.some((user) => user.username === username)) {
      setError('Username is already taken.');
      return false;
    }
    if (password !== confirm_password) {
      setError('Passwords do not match.');
      return false;
    }

    setError('');
    return true;
  };

  const handleAddUser = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      await addUser({
        name: newUser.name,
        username: newUser.username,
        password: newUser.password,
      });
      
      const response = await getAllUsers();
      const createdUser = response.data.find((user) => user.username === newUser.username);

      // Save the logged-in user's data to localStorage
      if (createdUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(createdUser));
        console.log("User logged in and stored:", createdUser);
      }
      setUsers(response.data);
      setNewUser({ name: '', username: '', password: '', confirm_password: '' });
      alert('Account created successfully!');
    } catch (error) {
      console.error('Failed to add user:', error);
      setError('Failed to create account. Please try again later.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.text}>
        <p className={styles.sentence}>
          Sign up
          <span className={styles.highlight}> My Moodly</span>
        </p>
      </div>
      <div className={styles.formContainer}>
        <form>
          <label>
            <input
              className={styles.inputBox}
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
            />
          </label>

          <label>
            <input
              className={styles.inputBox}
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
          </label>

          <label>
            <input
              className={styles.inputBox}
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </label>

          <label>
            <input
              className={styles.inputBox}
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={newUser.confirm_password}
              onChange={(e) =>
                setNewUser({ ...newUser, confirm_password: e.target.value })
              }
            />
          </label>
        </form>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.buttonContainer}>
         <Link to="/navigation"><button className={styles.button} onClick={handleAddUser}>Continue &rarr;</button></Link>
      </div>
    </div>
  );
}

export default SignUp;
