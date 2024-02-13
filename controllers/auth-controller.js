const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models/db')

module.exports.register = async (req, res, next) => {
    const {username, password, confirmPassword, email, first_name, last_name, address, phone} = req.body
    try {
    // vaidation //
    if( !(username  && password && confirmPassword) ) {
        return next( new Error('Fullfill all inputs') )  
    }
    if( confirmPassword !== password) {
        throw new Error('Confirm password not match')
    }
    const hashedPassword = await bcrypt.hash(password, 8)
        console.log(hashedPassword)
    const data = {
        username,
        password : hashedPassword,
        email,
        first_name,
        last_name,
        address,
        phone
    }

    const rs = await db.user.create({ data })
    console.log(rs)

    res.json({ msg: "RESITER SUCCES"})
    res.send('in Register . . . ')
        
    } catch (err) {
        // next(err)
    }
};

module.exports.login = async (req, res, next) => {
    // res.send('in Login . . . ')
    const {username,password} = req.body
    try {
    //vilidation//
    if( !(username.trim() && password.trim) ){
        throw new Error('username or pass not corect')
    }
    //find user
    const user = await db.user.findFirstOrThrow({ where: { username }})
    //check pass
    const passOK = await bcrypt.compare(password, user.password)
    if(!passOK){ 
        console.log(passOK)
        throw new Error('Cannot login')
    }
    console.log(passOK)
    res.send(user)
    // jwt token
    const payload = { id: user.id }
    const token = jwt.sign(payload)
    } catch (err) {
        next(err)
    }
    
}