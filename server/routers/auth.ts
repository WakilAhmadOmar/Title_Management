const express = require("express");
const bcrypt = require("bcryptjs");
const jwts = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
import { User } from "../models/user";

const router = express.Router();
router.get("/", (req: any, res: any) => {
  console.log("sdfsdfff");
  res.send("<h1>Welcome To JWT Authentication </h1>");
});

// Signup route
router.post(
  "/signup",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      user = new User({
        name,
        email,
        password,
      });

      // Save user
      await user.save();

      // Create and return JWT
      const payload = { user: { id: user.id } };
      const token = jwts.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    } catch (err: any) {
      console.log(err.message);

      // Return error message if server error occur
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordMatched = user?.password === password;

      // ** if not matched send response that wrong password;

      if (!isPasswordMatched) {
        res.status(400).json({
          message: "Invalid credentials",
        });
        return;
      }
      // Create and return JWT
      const payload = { user: { id: user.id } };
      const token = jwts.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
