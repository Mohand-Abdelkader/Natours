const express = require('express');
const viewControllers = require('../controllers/viewControllers');

const router = express.Router();

router.get('/', viewControllers.getOverView);
router.get('/tour/:slug', viewControllers.getTour);

module.exports = router;
