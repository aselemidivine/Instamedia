import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
  //When you make a call to mongoDB, its gonna be asynchronous.
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      pictutrePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt); // Create a salt to encrypt our password, so that it is not exposed.

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      pictutrePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Create a status object so that the frontend engineer can understand the response.
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}; 

// LOGGING IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({msg: "User does not exist."});

    // This compares if the password coming from the db is the same as the password coming from the request body(frontend)
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    delete user.password; // remove password, so that it doesn't get sent to the frontend
    res.status(200).json({ token, user });


  } catch (err) {
    res.status(500).json({ err: err.message });
    
  }
};
