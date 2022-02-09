import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct, updateProduct
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

//fetch all products
// GET /api/products
// public
router.route("/").get(getProducts).post(protect, admin, createProduct);

//fetch single product
// GET /api/products/:id
// public
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect,admin,updateProduct)

export default router;
