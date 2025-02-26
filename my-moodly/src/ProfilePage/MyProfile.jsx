import { useState } from 'react';
import './MyProfile.css';

function MyProfile() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-container">
      <h1>My profile</h1>
      <div className="profile-card">
        <div className="profile-fields">
          <label>name:</label>
          <input type="text" placeholder="Enter your name" />
          
          <label>username:</label>
          <input type="text" placeholder="Enter your username" />
          
          <label>age:</label>
          <input type="number" placeholder="Enter your age" />
          
          <label>bio:</label>
          <textarea placeholder="Write something about yourself" />
        </div>
        
        <div className="profile-image-section">
          <div className="profile-image">
            {profileImage ? <img src={profileImage} alt="Profile" /> : <div className="placeholder-icon" />}
            <label htmlFor="imageUpload" className="upload-icon">✏️</label>
            <input 
              type="file" 
              id="imageUpload" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>
        </div>
      </div>
      <button className="save-button">Save</button>
    </div>
  );
}

export default MyProfile;
