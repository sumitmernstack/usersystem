const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.getDashboard);
router.get('/login-activities', dashboardController.getLoginActivities);

module.exports = router;
