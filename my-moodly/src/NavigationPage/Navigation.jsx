import { useNavigate } from "react-router-dom";
import "./NavigationPage.css";

function NavigationPage() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="navigation-page">
            <div className="navigation-content">
                <div className="menu">
                    <button onClick={() => handleNavigation("/home")}>
                        HOME
                    </button>
                    <button onClick={() => handleNavigation("/tasks")}>
                        TASKS
                    </button>
                    <button onClick={() => handleNavigation("/journal")}>
                        JOURNAL
                    </button>
                    <button onClick={() => handleNavigation("/info")}>
                        INFO
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavigationPage;
