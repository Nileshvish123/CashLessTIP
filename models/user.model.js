const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const UserSchema = mongoose.Schema({
    user_id:{
        unique:true,
        type:Number
    },
    first_name:{ type: String },
    last_name: { type: String },
    email: {
        type:String,
    },
    password:{
        type:String
    },
    phone: { type: String },
    user_role_id:{
        type:Number,
    },
    token:{
        type:String
    },
    gender:{ type: String },
    date_of_birth:{ type: Date },
    passwordlink:{
     type:String
    },
    jar_id:{type:Number},
    city_id:{ type: Number },
    is_active:  { type: Boolean, default: true },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('users', UserSchema);