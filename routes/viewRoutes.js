const express = require('express');
const viewControllers = require('../controllers/viewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.use(authControllers.isLoggedIn);

router.get('/', viewControllers.getOverView);
router.get('/tour/:slug', viewControllers.getTour);
router.get('/login', viewControllers.getLoginForm);

module.exports = router;
