const GalaxyProduct = require("../Model/GalaxyProduct");
const fs = require("fs");

exports.CreatItemForTrade_Controller = async(req,res)=>{
    try {
        const {ItemName , ItemQuantity  , ItemPrice , ItemDescription , GalaxyID } = req.fields
        const {ItemPhoto} = req.files;


        if(!ItemName || !ItemQuantity || !ItemPrice || !ItemPhoto || !ItemDescription || !GalaxyID){
            res.status(400).json({
                success:false,
                message:"Incomplete Credentails"
            })
        }
        const ItemToSave = new GalaxyProduct({...req.fields})

    
        ItemToSave.ItemPhoto.data = fs.readFileSync(ItemPhoto.path)
        ItemToSave.ItemPhoto.contentType = ItemPhoto.type
        
        await ItemToSave.save()

        res.status(200).json({
            success:true,
            message:"Item Saved"
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Some Error occur"
        })
    }

}

 // We are assuming that buyer can buy multiple products but from a single Galaxy only at a time
exports.BuyOrderFromGalaxy = async(req,res)=>{
   
        try {
            
            const{Goods , TotalOrderPrice} = req.body;
            const BuyerGalaxyDetail = req.params.BuyerID                    

            const SellerGalaxyDetail = Goods[0].GalaxyID
            
            const newTransaction = new GalaxyOrder({
                Goods,
                TotalOrderPrice,
                BuyerGalaxyDetail,
                SellerGalaxyDetail
            })

            await newTransaction.save()


            // Here we update the inventry of the seller Galaxy by reducing the ordered quantity.
            for(let iterate=0 ;iterate<Goods.length;iterate++){
                const item = Goods[iterate];
           
                const searchForUpdate = await GalaxyProduct.findById(item.GalaxyProductID).select("-ItemPhoto")
               

                // The Quantity can be negative so this issue is been taken care before placing the order at frontend. 

                searchForUpdate.ItemQuantity = searchForUpdate.ItemQuantity - item.ItemQuantity
                await searchForUpdate.save()
            }

            res.status(200).json({
                success:true,
                newTransaction
            })
            
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error
            })
        }
}


exports.GetAllInventory = async(req,res)=>{

    try {

        const GalaxyIds = req.params.GalaxyId;
        console.log(GalaxyIds)
        const Inventory = await GalaxyProduct.find({GalaxyID:GalaxyIds}).select("-ItemPhoto")
        console.log(Inventory)

        res.status(200).json({
            success:true,
            message:"Inventory of a Perticular Galaxy",
            Inventory
        })
        


    } catch (error) {
        
    }
}
