const GalaxySchema = require("../Model/GalaxySchema")
const {  hashedPassword, comparePassword } = require("../PasswordEncryption/PasswordEncryption")



exports.GalaxyRegisterController = async(req,res)=>{

    try {
        
        const{GalaxyName , GalaxyEmailId , GalaxyPassword } = req.body
        console.log(GalaxyName , GalaxyEmailId , GalaxyPassword)
        if(!GalaxyName || !GalaxyEmailId || !GalaxyPassword){
            return res.status(400).json({
                success:false,
                message:"Some data is missing"
            })
        }
        
        const GalaxyExist = await GalaxySchema.findOne({GalaxyEmailId})
        if(GalaxyExist){
            return res.status(400).send({
                success:false,
                message:"Galaxy already exist"
            })
        }
      
        const hashedPass = await hashedPassword(GalaxyPassword)
   

        const Galaxy = new GalaxySchema({
            GalaxyEmailId,
            GalaxyName,
            GalaxyPassword : hashedPass
        })
        await Galaxy.save()

        res.status(202).json({
            success:true,
            message:"Galaxy registered successfully",
            GalaxyId : Galaxy._id
        })
        
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

}


exports.GalaxyLoginController = async(req,res)=>{

    try {

        const {GalaxyEmailId , GalaxyPassword} =req.body;
        const GalaxyExist = await GalaxySchema.findOne({GalaxyEmailId});
        if(GalaxyExist){
            const SamePassword = await comparePassword(GalaxyPassword , GalaxyExist.GalaxyPassword);

            if(SamePassword){
                return res.status(202).json({
                    success:true,
                    message:"Successfully login",
                    GalaxyExist:GalaxyExist._id
                })
            }
        }
        return res.status(400).json({
            success:false,
            message:"Invalid Credential"
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error
        })
    }

}
