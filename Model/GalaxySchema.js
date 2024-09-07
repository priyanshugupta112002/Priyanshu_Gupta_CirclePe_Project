const mongoose = require("mongoose")

//Schema used during the registration of a Galaxy on our platform
const Galaxy_Schema = new mongoose.Schema({

    GalaxyName:{
        type:String,
        require:true
    },
    GalaxyEmailId:{
        type:String,
        require:true
    },
    GalaxyPassword:{
        type:String,
        require:true
    },
    GalaxyRole:{
        type:String,
        default :"Buyer"
    }

})

const GalaxySchema = mongoose.model("Galaxies",Galaxy_Schema)
module.exports = GalaxySchema