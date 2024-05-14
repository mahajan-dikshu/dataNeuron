// componentModel.js
const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
    component_number:{
        type:Number,
        required:true
    },
    content: {
        type: String,
        required: true,
    },
    is_active:{
        type:Boolean,
        default:true
    },
    timestamp:{
        type:String,
        default:Date.now()
    }
});

module.exports = mongoose.model('Component', componentSchema);
