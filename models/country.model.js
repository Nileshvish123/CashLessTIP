const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const CountrySchema = mongoose.Schema({
    id:{
        type:String
    },
    code:{ type: String },
    name:{ type: String },
    phonecode:{ type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('countries', CountrySchema);