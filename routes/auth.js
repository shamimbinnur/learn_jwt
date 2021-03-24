const router = require('express').Router();
const { userRegisterValidation, loginValidation }  = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Validation
const Joi = require('@hapi/joi');

// Importing Schema
const userModel = require('../models/User');



router.post("/register", async (req, res)=>{

    const {error} = userRegisterValidation.validate(req.body);
    

    if(error) return res.status(400).send(error.details[0].message)
    
    const emailExist = await userModel.findOne({ email : req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    try {
        const createdUser = await user.save();
        res.json(createdUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/login", async(req, res)=>{
    const {error} =  loginValidation.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const user = await userModel.findOne({email : req.body.email});
    if(!user) return res.status(400).send("Invalid mail")

    const passIsValid = await bcrypt.compare(req.body.password, user.password);
    if(!passIsValid) return res.status(500).send("Password in correct");

    // Create and assign token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRATE);
    res.header('auth-token', token).send(token)

    
})

module.exports = router;