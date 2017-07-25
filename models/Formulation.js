const mongoose = require('mongoose');

const formulationSchema = new mongoose.Schema({
  name: String,
  dataSourceFile: String,  // Replace with link to source file in database.
  geodataSourceFile: String,  // Replace with link to source file in database.
}, { timestamps: true });

const Formulation = mongoose.model('Formulation', formulationSchema);

module.exports = Formulation;
