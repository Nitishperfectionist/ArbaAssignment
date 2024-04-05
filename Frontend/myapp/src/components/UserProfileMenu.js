import React from 'react';

const UserProfileMenu = ({ onMyStore, onProfile, onLogout }) => {
  return (
    <div className="user-profile-menu">
      <button onClick={onMyStore}>My Store</button>
      <button onClick={onProfile}>Profile</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserProfileMenu;
