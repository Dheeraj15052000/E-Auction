import asyncHandler from "express-async-handler";
import Bid from "../models/bidModel.js";
import Item from "../models/itemModel.js";

//fetch all products
// GET /api/products
// public

export const getBids=asyncHandler(async(req,res)=>{
    const items = await Bid.find({});
    res.json(items);
})

//fetch single product
// GET /api/products/:id
// public
export const getBidById=asyncHandler(async(req,res)=>{
    console.log(req.params.id);
    const item = await Bid.find({item:req.params.id}).populate(
        'user',
        'name email'
      ).sort({bidPrice:-1,createdAt:1});
    if (item) {
      res.json(item);
    } else {
      res.status(404)
      throw new Error('Bid not found')
    }
})
export const getBidByUserId=asyncHandler(async(req,res)=>{
   console.log(req.user._id+"fdgf");
    const item = await Bid.find({user:req.user._id}).populate(
        'item',
        'name'
      ).sort({bidPrice:-1,createdAt:1});
    if (item) {
      res.json(item);
    } else {
      res.status(404)
      throw new Error('Bid not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteBid = asyncHandler(async (req, res) => {
  const product = await Bid.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Bid removed' })
  } else {
    res.status(404)
    throw new Error('Bid not found')
  }
})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createBid = asyncHandler(async (req, res) => {
  const product = new Bid({
    
   item:req.body.item,
    bidPrice:req.body.bidPrice,
    isPaid:false,
    isWinner:false,
   user:req.user._id
   
  })


  const createdProduct = await product.save()
 
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateBid = asyncHandler(async (req, res) => {
  const {
    isWinner,
    isPaid
  } = req.body

  const product = await Bid.findById(req.params.id)

  if (product) {
    product.isPaid = isPaid
    product.isWinner =isWinner
    

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Bid not found')
  }
})