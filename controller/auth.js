const bcrypt = require("bcrypt");
const User = require("../modals/user");
const otpService = require("../services/otp_service");
const jwt = require("jsonwebtoken");

// Function to send OTP to the user's email
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const otp = otpService.generateOTP();

    // Send OTP to the user via email
    await otpService.sendOTPEmail(email, otp);

    // For demo purposes, let's just log the OTP
    console.log("Generated OTP:", otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function for OTP verification and user creation
const verifyOTPAndCreateUser = async (req, res) => {
  try {
    const { name, username, email, password, otp } = req.body;

    // Verify the OTP
    const isVerified = otpService.verifyOTP(otp);

    if (!isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "OTP verification failed" });
    }

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "highendsecurity", {
      expiresIn: "1h",
    });

    // Send token in response along with success message
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// forget password
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Generate OTP
    const otp = otpService.generateOTP();

    // Send OTP to the user via email
    await otpService.sendOTPEmail(email, otp);

    // For demo purposes, let's just log the OTP
    console.log("Generated OTP:", otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//verfiy OTP and update password
const verifyOTPAndUpdatePassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    // Verify the OTP
    const isVerified = otpService.verifyOTP(otp);

    if (!isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "OTP verification failed" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// signup without otp verification
const signupnootp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};  


module.exports = {
  sendOTP,
  verifyOTPAndCreateUser,
  login,
  forgetPassword,
  verifyOTPAndUpdatePassword,
  signupnootp,
};
