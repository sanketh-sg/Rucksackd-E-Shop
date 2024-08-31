const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const productModel = require("../models/products")

router.get('/', (req,res) => {
    res.send('Helloo Products')
});

router.post('/create',upload.single("image"), async (req,res) => {
    try{
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        // Convert the image buffer to a Base64 string

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        let { name, price, discount, bgColor, panelColor, textColor } = req.body;

        let product = await productModel.create({
        productName: name,
        productImage: base64Image,
        price,
        discount,
        bgColor,
        panelColor,
        textColor
        })
        req.flash("successProduct", "Successfully added the product.");
        console.log(product);
        product.save()
        .then(() => res.redirect('/admins'))
        .catch(err => res.status(500).send(err));
    }
    catch(err){
        res.status(500).send('Error uploading image: ' + err.message);
    }
});

module.exports = router;