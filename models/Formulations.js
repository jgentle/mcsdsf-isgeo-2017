const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const formulationsSchema = new mongoose.Schema({
  name: String
});

const Formulations = mongoose.model('Formulations', formulationsSchema);

module.exports = Formulations;
