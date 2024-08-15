const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Helloo Products')
});

module.exports = router;