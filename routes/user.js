import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// WE ARE GOING TO BE USING CRUD PRINCIPLES
// READ
router.get("/:id", verifyToken, getUser); // We can use a query string to grab a particular ID
router.get("/:id/firends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/friendId", verifyToken, addRemoveFriend);

export default router;
