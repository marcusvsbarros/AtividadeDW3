const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    title: 
    {
        type: String, required: true, max: 100
    },
    description: 
    {
        type: String, required: true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
// Exportar o modelo
module.exports = mongoose.model('Project', projectSchema)