// operationCountModel.js
const mongoose = require('mongoose');

const operationCountSchema = new mongoose.Schema({
    operation_type: {
        type: String,
        enum: ['add', 'update'],
        required: true,
    },
    component_number: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('OperationCount', operationCountSchema);
