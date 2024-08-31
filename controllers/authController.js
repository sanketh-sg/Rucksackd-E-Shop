const userModel = require('../models/user')

const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = (req,res) => {
    let {fullname, password, email, contact} = req.body;

    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(password,salt, async (err,encrypPwd) => {
            if(err){
                res.send(err.message);
            }else{
                try {
                    let user = await userModel.findOne({email})
                    if(!user){
                        user = await userModel.create({
                        fullname,
                        password: encrypPwd,
                        email,
                        contact,});
                        res.cookie("token",generateToken(user));
                        res.redirect('/shop')
                    }else{
                        res.send("Email already present")
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }      
        });
    });
    //To Do; Validation
    
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
            res.cookie('token',token).redirect('/shop');

        }else{
            res.status(401).send('Incorrect Username or Password');
        }
    })
}

module.exports.logoutUser = (req,res) => {
    res.cookie("token","");
    res.redirect("/");
};

