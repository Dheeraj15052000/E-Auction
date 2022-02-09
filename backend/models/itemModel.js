import mongoose from "mongoose";




const itemSchema = mongoose.Schema(
  {
     
   
    name:{
        type:String,
        required:true
    },
    imageUrl:{
      type:String,
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    
    
    isCompleted:{
      type:Boolean,
      default:false
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    price:{
      type:Number,
      default:2
    },
    soldAt:{
      type:Number,
      
    },
    highest:{
      type:Number,
      default:0
    }


  },
  {
    timestamps: true,
  }
);




const Item = mongoose.model("Item", itemSchema);

export default Item;