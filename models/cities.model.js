const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const CitySchema = mongoose.Schema({
    id:{
        type:String
    },
    name:{ type: String },
    state_id:{ type: String },
   
}, {
    timestamps: true
});

module.exports = mongoose.model('cities', CitySchema);