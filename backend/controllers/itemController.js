import Item from "../models/itemModel.js";
import asyncHandler from "express-async-handler";

//fetch all products
// GET /api/products
// public

export const getItems=asyncHandler(async(req,res)=>{
    const items = await Item.find({});
    res.json(items);
})

//fetch single product
// GET /api/products/:id
// public
export const getItemById=asyncHandler(async(req,res)=>{
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404)
      throw new Error('Item not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteItem = asyncHandler(async (req, res) => {
  const product = await Item.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Item removed' })
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createItem = asyncHandler(async (req, res) => {
  const product = new Item({
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    soldAt:0,
    isPaid:false,
    isCompleted:false,
    description: req.body.description,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateItem = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    imageUrl,
    isPaid,
    isCompleted,
    soldAt,
  } = req.body

  const product = await Item.findById(req.params.id)

  if (product) {
    
    product.isPaid = isPaid
    product.isCompleted = isCompleted
    

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})