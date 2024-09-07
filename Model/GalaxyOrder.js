const mongoose = require("mongoose");

const Galaxy_Order = new mongoose.Schema({
    Goods: [
        {
            GalaxyName:{
                type:String,
                require:true
            },
            ItemQuantity:{
                type:Number,
                min:1
            },
            ItemPrice:{
                type:Number,
                require:true
            },
            GalaxyID:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Galaxies"
            },
            GalaxyProductID:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "GalaxyProducts"
            }
        }
    ],
    SellerGalaxyDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Galaxies"
    },
    BuyerGalaxyDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Galaxies"
    },
    TotalOrderPrice: {
        type: Number,
        required: true,
        min: 1
    },
    OrderStatus: {
        type: String,
        default: "Processing",
        enum: ["Processing" , "In Transit", "Shipped", "Delayed" , "Cancelled"]
    }
}, { timestamps: true });


const GalaxyOrder = mongoose.model("GalaxyOrders", Galaxy_Order);
module.exports = GalaxyOrder;
