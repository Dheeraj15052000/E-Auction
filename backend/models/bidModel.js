import mongoose from "mongoose";

const bidSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
  
    item:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Item'},
   
    bidPrice:{
        type:Number,
        required:true,
        default:0,
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    isWinner:{
        type:Boolean,
        required:true,
        default:false
    },
    
    
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
