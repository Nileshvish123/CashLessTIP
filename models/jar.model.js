const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const JarSchema = mongoose.Schema({
    id:{
        unique:true,
        type:Number
    },
    owner_id:{type:Number},
    jar_type:{ type: String },  //Shared tip jar, Private tip jar//
    category_id:{type:Number},
}, {
    timestamps: true
});

module.exports = mongoose.model('Jars', JarSchema);