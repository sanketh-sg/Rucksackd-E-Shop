const mongoose = require('mongoose');
const dbug = require('debug')('dev:mongoose');
const config = require('config')

mongoose.connect(`${config.get('MONGODB_URI')}/rucksackd-dev`)
.then(()=> {
   dbug("DB connected");
})
.catch((err) => {
   dbug("Error connecting to DB:", err.message); // Log error message
   dbug(err); // Log full error object for more details
});

module.exports = mongoose.connection;

