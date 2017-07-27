const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemsModelConfigurationSchema = new mongoose.Schema({
  name: String,
  description: String,
  configurationData_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for document in datasources collection.
  isValidated: Boolean   // check to ensure all subdocuments have been validated.
}, { timestamps: true });

const SystemsModelConfiguration = mongoose.model('SystemsModelConfiguration', systemsModelConfigurationSchema);

module.exports = SystemsModelConfiguration;
