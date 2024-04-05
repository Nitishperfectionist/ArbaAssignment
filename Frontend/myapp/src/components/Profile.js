import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <div>
        <img src={user.avatar} alt="Avatar" />
        <h3>{user.fullName}</h3>
        <p>Email: {user.email}</p>
      </div>
      <button>Update Profile</button>
      <button>Change Password</button>
      <button>See Terms & Conditions</button>
    </div>
  );
};

export default Profile;
