const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

// signup controller
module.exports.signupController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body

    const existingUser = await userModel.findOne({ email })

    if (existingUser) return res.status(401).json({ message: "User Already exists Please Login" })

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      fullname,
      email,
      password: hash,
    })

    // generating Token
    const token = generateToken(user._id)

    res.cookie("Jwt_Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: "User Created Successfully",
      user,
      token
    })
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// login controller
module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) return res.status(403).json({ message: "User Not Found" })

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) return res.status(403).json({ message: "Invalid credentials" })

    // generating Token
    const token = generateToken(user._id)

    res.cookie("Jwt_Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "User login Successfully",
      user,
      token
    })
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports.logoutController = async (req, res) => {
  try {
    res.clearCookie("Jwt_Token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logout Successfully"
    })
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}