const mongoose = require('mongoose');

const dataSourceSchema = new mongoose.Schema({
  name: String,
  geospatialData: Boolean,
  dataType: String
}, { timestamps: true });

const DataSource = mongoose.model('DataSource', dataSourceSchema);

module.exports = DataSource;
