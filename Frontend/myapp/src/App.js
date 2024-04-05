import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import TermsAndConditionsDialog from './components/Auth/TermsAndConditionsDialog';
import UserProfileMenu from './components/UserProfileMenu';
import Profile from './components/Profile';
import MyStore from './components/MyStore';
import HomePage from './components/HomePage';
import AllProductsPage from './components/AllProductsPage';
import ProductCartPage from './components/ProductCartPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showTcDialog, setShowTcDialog] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      fetchUserProfile();
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      fetchUserProfile();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignup = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      fetchUserProfile();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUser(null);
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('User profile fetch failed');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSeeTc = () => {
    setShowTcDialog(false);
  };

  return (
    <Router>
      <div className="container">
        {loggedIn && <UserProfileMenu onMyStore={() => {}} onProfile={() => {}} onLogout={handleLogout} />}
        {showTcDialog && <TermsAndConditionsDialog onAccept={handleSeeTc} onCancel={() => setShowTcDialog(false)} />}
        <Switch>
          <Route exact path="/">
            {!loggedIn ? <Login onLogin={handleLogin} /> : <HomePage />}
          </Route>
          <Route path="/signup">
            {!loggedIn ? <Signup onSignup={handleSignup} /> : <Redirect to="/" />}
          </Route>
          <Route path="/profile">
            {loggedIn ? <Profile user={user} /> : <Redirect to="/" />}
          </Route>
          <Route path="/my-store">
            {loggedIn ? <MyStore /> : <Redirect to="/" />}
          </Route>
          <Route path="/all-products">
            {loggedIn ? <AllProductsPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/cart">
            {loggedIn ? <ProductCartPage /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
