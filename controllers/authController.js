const userModel = require('../models/user')

const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser =  async (req,res) => {
    let {fullname, password, email, contact} = req.body;

    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(password,salt,(err,encrypPwd) => {
            if(err){
                res.send(err.message);
            }else{
                password = encrypPwd;
            }      
        });
    });
    //To Do; Validation
    try {
        let user = await userModel.findOne({email})
        if(!user){
            user = await userModel.create({
            fullname,
            password,
            email,
            contact,});
            res.cookie("token",generateToken(user));
            res.status(201).send("User Created");
        }else{
            res.send("Email already present")
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.loginUser = async (req,res) => {
    let { email, password } = req.body;

    let user =  await userModel.findOne({email});
    
    if(!user){
        res.status(401).send('Incorrect Username or Password');
    }
    bcrypt.compare(password,user.password,(err,result) => {
        if(err)
        {
            res.send('Something went wrong');
        }
        if(result){
            let token = generateToken(user);
            res.cookie('token',token);
            res.redirect('/home');
        }else{
            res.status(401).send('Incorrect Username or Password');
            res.redirect('/login');
        }
    })
}