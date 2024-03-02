// controllers/authController.js

const bcrypt = require('bcrypt');
const { User, LoginActivity } = require('../models'); // Assuming you've defined your models in a 'models' directory

// Sign up a new user
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before storing
    const user = await User.create({ email, password: hashedPassword });
    res.redirect('/login'); // Redirect to login page after successful signup
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up user');
  }
};

// Login existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Incorrect password');
    }
    // Record login activity
    await LoginActivity.create({ userId: user.id, loginTimestamp: new Date(), success: true });
    req.session.userId = user.id; // Store user ID in session
    res.redirect('/dashboard'); // Redirect to dashboard after successful login
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
};

// Logout user
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
