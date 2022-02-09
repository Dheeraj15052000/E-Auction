import express from "express";
import { createItem, deleteItem, getItemById, getItems, updateItem } from "../controllers/itemController.js";
const router = express.Router();

import { admin, protect } from "../middleware/authMiddleware.js";

//fetch all products
// GET /api/products
// public
router.route("/").get(getItems).post(/*protect, admin, */createItem);

//fetch single product
// GET /api/products/:id
// public
router
  .route("/:id")
  .get(getItemById)
  .delete(protect, admin, deleteItem)
  .put(updateItem)

export default router;