const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configurationSchema = new mongoose.Schema({
  name: String,
  dataSource_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for document in datasources collection.
  geodataSource_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for document in datasources collection.
  configurationData_id: { type: Schema.Types.ObjectId, ref: 'JsonData' }   // _id for document in sourcedata collection.
}, { timestamps: true });

const Configuration = mongoose.model('Configuration', configurationSchema);

module.exports = Configuration;
