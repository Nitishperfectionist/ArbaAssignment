const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

exports.register = async ({ fullName, userName, email, password, avatar }) => {
  try {
    let user = await User.findOne({ email });

    if (user) {
      throw new Error('Email already exists');
    }

    user = new User({
      fullName,
      userName,
      email,
      password,
      avatar
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return 'User registered successfully';
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    return jwt.sign(payload, config.secretOrKey, { expiresIn: '1h' });
  } catch (error) {
    throw new Error(error.message);
  }
};
