//import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './WelcomePage/Welcome';
import SignUp from './SignUpPage/SignUp';
import LogIn from './LogInPage/LogIn';
import NavigationPage from './NavigationPage/Navigation';
import JournalPage from './JournalPage/JournalPage';
import InfoPage from './InfoPage/InfoPage';
import Tasks from './TasksPage/Tasks';
import MyProfile from './ProfilePage/MyProfile';
import HomePage from './HomePage/HomePage';
import TaskProvider from './TasksPage/TaskContent.jsx';
import UserProvider from './SignUpPage/UserContext.jsx';

function App() {
  return(
    <UserProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signUp" element={<SignUp />}/>
            <Route path="/login" element={<LogIn />}/>
            <Route path="/navigation" element={<NavigationPage />}/>
            <Route path="/journal" element={<JournalPage />}/>
            <Route path="/info" element={<InfoPage />}/>
            <Route path="/tasks" element={<Tasks />}/>
            <Route path="/profile" element={<MyProfile />}/>
            <Route path="/home" element={<HomePage />}/>
          </Routes>
        </Router>
      </TaskProvider>
    </UserProvider>
  );
}

export default App
