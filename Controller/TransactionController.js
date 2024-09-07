const eventEmitter = require("../EventProcessing/EvnetsAction");
const GalaxyOrder = require("../Model/GalaxyOrder");



exports.GetAllTransaction = async(req,res)=>{

    try {

        const AllTransaction = await GalaxyOrder.findOne().sort({ createdAt: -1 }) 

        res.status(200).json({
            success:true,
            message:"All the transaction",
            AllTransaction
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Some Error occur"
        })
    }

}

exports.GetParticularGalaxyTransaction = async(req,res)=>{

    try {
        const GalaxyId =req.params.GalaxyId;
        const Transaction = await GalaxyOrder.find({SellerGalaxyDetail:GalaxyId})

        res.status(200).json({
            success:true,
            message:"Transaction you asked",
            Transaction
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Some Error occur"
        })
    }

}

exports.GetParticularTransaction = async(req,res)=>{

    try {
        const TransactionID =req.params.TransactionId;
        console.log(TransactionID)
        const Transaction = await GalaxyOrder.findById(TransactionID)

        res.status(200).json({
            success:true,
            message:"Transaction you asked",
            Transaction
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Some Error occur"
        })
    }

}

exports.UpdateStatusOfCargo = async(req,res)=>{

    try {
        const {NewStatus} =req.body
        
        const Transaction = await GalaxyOrder.findById(req.params.TransactionId).populate("BuyerGalaxyDetail")
        const ToEmailId = Transaction.BuyerGalaxyDetail.GalaxyEmailId
        Transaction.OrderStatus = NewStatus



        if(NewStatus == "Delayed" ){
            eventEmitter.emit('CriticalEvent/Delayed',Transaction , ToEmailId );
        }
        else if(NewStatus == "Cancelled"){

            // If the trade got cancelled due to any event then the inventory of the Galaxy should be updated.
            const Goods = Transaction.Goods
            for(let iterate=0 ;iterate<Transaction.length;iterate++){
                const item = Goods[iterate];
           
                const searchForUpdate = await GalaxyProduct.findById(item.GalaxyProductID).select("-ItemPhoto")

                searchForUpdate.ItemQuantity = searchForUpdate.ItemQuantity + item.ItemQuantity
                await searchForUpdate.save()
            }
            eventEmitter.emit('CriticalEvent/Cancelled',Transaction , ToEmailId );

        }else{
            eventEmitter.emit('TradeUpdated',Transaction , ToEmailId);
        }

        await Transaction.save()

        res.status(200).json({
            success:true,
            message:"Status Update Successfullu=y",
            Transaction
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Some unExpected Error Occur",Error
        })
    }

}