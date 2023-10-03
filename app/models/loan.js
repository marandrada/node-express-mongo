const mongoose = require('mongoose');
const { Schema } = mongoose;

const loanSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        default: 0,
        required: false
    },
    pendingPayment: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('loan', loanSchema)