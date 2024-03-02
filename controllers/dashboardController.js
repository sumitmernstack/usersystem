// controllers/dashboardController.js

const { LoginActivity } = require('../models');

// Display login activities
exports.displayLoginActivities = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }
    const activities = await LoginActivity.findAll({ where: { userId } });
    res.render('loginActivities', { activities }); // Assuming you have a loginActivities.ejs view
  } catch (error) {
    console.error(error);
    res.status(500).send('Error displaying login activities');
  }
};
