const mongoose = require('mongoose');
const dbug = require('debug')('dev:mongoose');
const config = require('config')

mongoose.connect(`${config.get('MONGODB_URI')}/rucksackd-dev`)
.then(()=> {
   dbug("DB connected");
})
.catch((err)=>{
   dbug(err);
});

module.exports = mongoose.connection;