const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const KycSchema = mongoose.Schema({
    id: {
        unique: true,
        type: Number
    },
    user_id: { type: Number },
    status: { type: Number },
    identityNumber: { type: Number },
    identityPhoto: { type: String },
    datetime: { type: Date },
    address: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('kyc', KycSchema);