const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController.js');
const verifyOtp = require('../controllers/verifyOtp.js');
const addInfoController = require('../controllers/addInfoController.js');
const loginController = require('../controllers/loginController.js');
const procController = require('../controllers/protectedPageController.js');

// middleware import
const authenticateUser = require('../middlewares/userAuth.js');


// register route
router.post('/register', registerController);

// send otp
router.post('/email-otp-verification', verifyOtp);

// fill info route
router.post('/fill-info', addInfoController);

// LOGIN ROUTE
router.post('/login', loginController);

// Apply authentication middleware to protected routes
router.get('/protected', authenticateUser, procController);

module.exports = router;
