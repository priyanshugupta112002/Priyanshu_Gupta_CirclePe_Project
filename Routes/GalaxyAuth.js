const express = require("express")
const { GalaxyRegisterController, GalaxyLoginController } = require("../Controller/AuthController")

const Router =express.Router()

//To Regerster a Galaxy on the platform
Router.post("/api/register" , GalaxyRegisterController)

//To login a Galaxy
Router.post("/api/login" ,  GalaxyLoginController)

module.exports = Router