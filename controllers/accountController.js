const userModel = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.updateUser = async (req,res) => {
    let {fullname, email, password, newPassword, contact} = req.body;
    let user =  await userModel.findOne({email});
    bcrypt.compare(password,user.password, async (err,result) => {
        if(err)
        {
            req.flash('error','Incorrect password')
            res.redirect('/myAccount')
        }
        if(result){
            if(user.fullname != fullname || user.contact != contact){
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newPassword,salt, async (err,encrypPwd) => {
                        if(err){
                            res.send(err.message);
                        }else{
                            try {
                                let updateData = {
                                    fullname: fullname,
                                    password: encrypPwd,
                                    contact: contact
                                }
                                user = await userModel.findByIdAndUpdate(user._id, updateData)
                                req.flash('success','User update succcess ✅')
                                res.redirect('/shop')
                                }
                            catch (error) {
                                console.log(error.message);
                            }
                        
                        }
                    })
                })
            }else{
                req.flash('error', 'Nothing to update')
                res.redirect('/myAccount')
            }
        }else{
            req.flash('error','Incorrect password')
            res.redirect('/myAccount') 
        }
    });     


                
           


};