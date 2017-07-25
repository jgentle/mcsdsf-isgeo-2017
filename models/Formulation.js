const mongoose = require('mongoose');

const formulationSchema = new mongoose.Schema({
  name: String,
  description: String,
  dataSource_id: String,      // _id for dataSource file in database.
  geodataSource_id: String,   // _id for (geo)dataSource file in database.
  configuration_id: String,   // _id for configuration file in database.
  insights: Array,
}, { timestamps: true });

const Formulation = mongoose.model('Formulation', formulationSchema);

module.exports = Formulation;
