const express = require("express")
const formidableMiddleware = require('express-formidable');
const { GetAllInventory, CreatItemForTrade_Controller, BuyOrderFromGalaxy } = require("../Controller/GalaxyController");


const Router = express.Router()

//To publish or post the products of a Galaxy which can be purchased by other galaxies
Router.post("/api/Create-Item-For-Trade",formidableMiddleware() , CreatItemForTrade_Controller)

// To place a Buy order from a Galaxy to a different one which initiate the TRADE
Router.post("/api/transaction/:BuyerID" , BuyOrderFromGalaxy)

//To keep track of the inventory of a Galaxy
Router.get("/api/inventory/:GalaxyId" , GetAllInventory)


module.exports = Router