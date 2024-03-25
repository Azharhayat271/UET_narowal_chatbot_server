// routes.js
const express = require('express');
const router = express.Router();
const { sendOTP } = require('../controller/auth');
const {verifyOTPAndCreateUser} = require("../controller/auth");
const {login} = require("../controller/auth");
const {forgetPassword} = require("../controller/auth");
const {verifyOTPAndUpdatePassword} = require("../controller/auth");


// Create Installment Route
router.post('/signup', sendOTP);
router.post('/verify', verifyOTPAndCreateUser);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post('/verify-otp', verifyOTPAndUpdatePassword);






module.exports = router;