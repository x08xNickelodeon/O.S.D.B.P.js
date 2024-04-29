const { model, Schema } = require('mongoose');
 
let base = new Schema({
    Guild: String,
    Channel: String,
})
 
module.exports = model(`base`, base);