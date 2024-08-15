const express = require('express');
const router = express.Router();
const adminsModel = require('../models/admin')

if(process.env.NODE_ENV === 'development'){
    router.post('/create', async (req,res) => {
        let admin = await adminsModel.find();
        if(admin.length >0){
            return res.status(401)
            .send("Admin exists already!!")
        }
        let { fullname,email,password } = req.body;

        admin = await adminsModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send("Admin Created");
    });

}
router.get('/', (req,res) => {
    res.send('Helloo Admin')
});

module.exports = router;