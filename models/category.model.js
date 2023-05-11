const mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

const CategorySchema = mongoose.Schema({
    id: {
        unique: true,
        type: Number
    },
    name: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);