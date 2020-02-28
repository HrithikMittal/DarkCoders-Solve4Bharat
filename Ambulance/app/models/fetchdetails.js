var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetailSchema = new Schema({
    PatientNo: Number,
    PatientPassword: String,
});

module.exports = mongoose.model('Details', DetailSchema);