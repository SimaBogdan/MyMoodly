import styles from './Welcome.module.css';
import { Link } from 'react-router-dom';


function Welcome() {
    console.log("Welcome page loaded");
    return (
        <div className={styles.background} >
            <div className={styles.text}>
                <p className={styles.sentence}>Welcome to your self-care and productivity space!</p>
                <p className={styles.sentence}>Start your journey with</p>
                <p className={styles.sentence}>
                    <span className={styles.highlight}>My Moodly</span> Today
                </p>
            </div>
            <div className={styles.coloredText}>
                Here, you can see today’s tasks, track your progress, and add thoughts to your personal journal. It’s a simple, supportive place to help you stay focused and grow at your own pace.
            </div>
            <div className={styles.buttonContainer}>
                <Link to="/signup"><button className={styles.buttonUp}>Create account</button></Link>
                <Link to="/login"><button className={styles.buttonDown}>I already have an account</button></Link>
            </div>
        </div>
    );
}

export default Welcome;
