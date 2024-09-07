const mongoose = require("mongoose")

const Galaxy_Product = new mongoose.Schema({

    ItemName:{
        type:String,
        require:true,
    },
    ItemQuantity:{
        type:Number,
        min:0
    },
    ItemPhoto:{
        data:Buffer,
        contentType:String,
    },
    ItemPrice:{
        type:Number,
        require:true
    },
    ItemDescription:{
        type:String,
        require:true
    },
    ItemRating:{
        type:Number,
        default:0
    },
    GalaxyID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Galaxies"
    }
    
})

const GalaxyProduct = mongoose.model('GalaxyProducts', Galaxy_Product)
module.exports = GalaxyProduct