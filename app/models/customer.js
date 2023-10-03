const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('customer', customerSchema)