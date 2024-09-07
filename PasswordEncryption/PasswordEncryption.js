const bcrypt = require('bcrypt');


// To Hashed the password during registration
const hashedPassword = async(password)=>{

    try {

    const saltRounds = 10;
    const hashedPass= await bcrypt.hash(password,saltRounds)

    return hashedPass

    } catch (error) {
        console.log(error , "password can not be hashed ,hashedPassword")
    }
}

//To Check the password with the registered password
const comparePassword = async(password , hashedPassword)=>{
    return await bcrypt.compare(password , hashedPassword)
}

module.exports = {hashedPassword , comparePassword}