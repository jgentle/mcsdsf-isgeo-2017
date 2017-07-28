const SystemsModel = require('../models/SystemsModel.js');

const systemsModelsController = {};

// List All
systemsModelsController.list = function(req, res) {
  SystemsModel.find({}).exec(function (err, systemsmodels) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("systemsModels/index", {
        title: 'Systems Model',
        systemsmodels: systemsmodels
      });
    }
  });
};

// Find by _id
systemsModelsController.show = function(req, res) {
  SystemsModel.findOne({_id: req.params.id}).exec(function (err, systemsmodel) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("systemsModels/show", {
        title: 'SystemsModel Details',
        systemsmodel: systemsmodel
      });
    }
  });
};

// Create (redirect to form)
systemsModelsController.create = function(req, res) {
  res.render("systemsModels/create", {
    title: 'Create SystemsModel'
  });
};

// Save new SystemsModel
systemsModelsController.save = function(req, res) {
  var systemsModel = new SystemsModel(req.body);

  systemsModel.save(function(err) {
    if(err) {
      console.log(err);
      res.render("systemsModels/create");
    } else {
      console.log("Successfully created new SystemsModel.");
      res.redirect("/systems-models/show/"+systemsModel._id);
    }
  });
};

// Edit SystemsModel
systemsModelsController.edit = function(req, res) {
  SystemsModel.findOne({_id: req.params.id}).exec(function (err, systemsmodel) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("systemsModels/edit", {
        title: 'Edit SystemsModel',
        systemsmodel: systemsmodel
      });
    }
  });
};

// Update SystemsModel
systemsModelsController.update = function(req, res) {
  SystemsModel.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, description: req.body.description }}, { new: true }, function (err, systemsModel) {
    if (err) {
      console.log(err);
      res.render("systemsModels/edit", {
        title: 'Update SystemsModel',
        systemsModel: req.body
      });
    }
    res.redirect("/systems-models/show/"+systemsModel._id);
  });
};

// Delete SystemsModel
systemsModelsController.delete = function(req, res) {
  SystemsModel.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("SystemsModel deleted!");
      res.redirect("/systems-models");
    }
  });
};

// Export controller.
module.exports = systemsModelsController;
