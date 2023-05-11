const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const StateSchema = mongoose.Schema({
    id:{
        type:String
    },
    remark:{ type: String },
    name:{ type: String },
    country_id:{ type: String },
   
}, {
    timestamps: true
});

module.exports = mongoose.model('states', StateSchema);