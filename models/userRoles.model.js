const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const UserRoleSchema = mongoose.Schema({
    role_id:{
        unique:true,
        type:Number
    },
    role_name:{ type: String },
    
    is_active:  { type: Boolean, default: true },
   
}, {
    timestamps: true
});

module.exports = mongoose.model('userRoles', UserRoleSchema);