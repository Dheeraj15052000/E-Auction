import express from "express";
import { createBid, deleteBid, getBidById, getBidByUserId, getBids, updateBid } from "../controllers/bidController.js";
import { createItem, deleteItem, getItemById, getItems, updateItem } from "../controllers/itemController.js";
const router = express.Router();

import { admin, protect } from "../middleware/authMiddleware.js";

//fetch all products
// GET /api/products
// public
router.route("/").get(getBids).post(protect,createBid);
router.route("/user").get(protect,getBidByUserId);
//fetch single product
// GET /api/products/:id
// public

router
  .route("/:id")
  .get(getBidById)
  .delete(protect, deleteBid)
  .put(updateBid)

export default router;