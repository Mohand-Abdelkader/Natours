const express = require('express');
const viewControllers = require('../controllers/viewControllers');

const router = express.Router();

router.get('/', viewControllers.getOverView);
router.get('/tour', viewControllers.getTour);

module.exports = router;
