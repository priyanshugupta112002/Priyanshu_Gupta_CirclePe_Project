const express = require("express")
const { CreatItemForTrade_Controller, BuyOrderFromGalaxy, GetAllTransaction, GetParticularTransaction, GetParticularGalaxyTransaction, UpdateStatusOfCargo } = require("../Controller/TransactionController");


const Router = express.Router()



//To get all the trades/transaction of All the Galaxies
Router.get("/api/Get-All-Transaction" ,GetAllTransaction )

//To get all transaction of a perticular GalaxyId
Router.get("/api/Galaxy-Transaction/:GalaxyId" , GetParticularGalaxyTransaction)

// To get detail of a particular Transaction
Router.get("/api/Transaction/:TransactionId" , GetParticularTransaction)

//To Update the Delivey Status Of a Cargo 
Router.put("/api/Update-Status-Of-Goods/:TransactionId" , UpdateStatusOfCargo)

module.exports = Router