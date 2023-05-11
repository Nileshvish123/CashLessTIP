const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const PlansSchema = mongoose.Schema({
    id:{
        unique:true,
        type:Number
    },
    title:{type:String},
    description:{ type: String }, 
    amount:{type:Number},
    duration:{type:Number},
    date:{type:Date}
}, {
    timestamps: true
});

module.exports = mongoose.model('plans', PlansSchema);