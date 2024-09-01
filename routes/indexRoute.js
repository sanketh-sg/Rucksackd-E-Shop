const express = require('express')
const router = express.Router();
const isLoggedIn = require('../utils/isLoggedIn')
const productModel = require('../models/products')
const userModel = require('../models/user');
const products = require('../models/products');

router.get('/',(req,res) =>{
    let error = req.flash('error')
    res.render('index',{error, loggedin: false});
});

router.get('/shop', isLoggedIn, async (req,res) => {
    let products = await productModel.find();
    let success = req.flash('success')
    res.render('shop',{ products, success });
});

router.get("/cartAdd/:productId", isLoggedIn, async (req,res) => {

    let user = await userModel.findOne({email: req.user.email})

    user.cart.push(req.params.productId);
    await user.save();
    req.flash('success','Item added to cart✅');
    res.redirect('/shop');
});

router.post("/cart/remove/:productId", isLoggedIn, async (req,res) => {

    let user = await userModel.findOne({email: req.user.email})
    user.cart.pop(req.params.productId);
    await user.save()
    res.redirect('/cart')
});

router.get('/cart', isLoggedIn, async(req,res) => {
    let user = await userModel.findOne({email: req.user.email}).populate('cart')
    res.render('cart',{user});
})

module.exports = router;