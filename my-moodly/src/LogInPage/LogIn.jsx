import styles from "./LogIn.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAllUsers } from "../SignUpPage/ApiUser";

function LogIn() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data);
                console.log("Users fetched from backend:", response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setError("Unable to load user data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the username and password match a user in the database
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Credentials are correct, navigate to the next page
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            console.log("Login successful");
            navigate("/navigation");
        } else {
            // Show error message
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.text}>
                <p className={styles.sentence}>
                    Welcome back to
                    <span className={styles.highlight}> My Moodly</span>!
                </p>
                <p className={styles.sentence}>Please log in</p>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            className={styles.inputBox}
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            className={styles.inputBox}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.buttonContainer}>
                        <Link to="/navigation"><button className={styles.button} onClick={handleSubmit}>Continue &rarr;</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
