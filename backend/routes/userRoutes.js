import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgotPasswordMail,
  updateUserPassword,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from "../controllers/userController.js";
import { protect,admin } from "../middleware/authMiddleware.js";
router.route('/').get(protect, admin, getUsers)
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);
router.route("/resetmail").post(forgotPasswordMail);
router.route("/resetpassword").put(updateUserPassword);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
