const SystemsModelConfiguration = require('../models/SystemsModelConfiguration.js');

const systemsModelConfigurationsController = {};

// List All
systemsModelConfigurationsController.list = function(req, res) {
  SystemsModelConfiguration.find({}).exec(function (err, systemsmodelconfigurations) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("systemsModelConfigurations/index", {
        title: 'Systems Model Configs',
        systemsmodelconfigurations: systemsmodelconfigurations
      });
    }
  });
};

// Find by _id
systemsModelConfigurationsController.show = function(req, res) {
  SystemsModelConfiguration.findOne({_id: req.params.id}).exec(function (err, systemsmodelconfiguration) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("systemsModelConfigurations/show", {
        title: 'Systems Model Config Details',
        systemsmodelconfiguration: systemsmodelconfiguration
      });
    }
  });
};

// Create (redirect to form)
systemsModelConfigurationsController.create = function(req, res) {
  res.render("systemsModelConfigurations/create", {
    title: 'Create Systems Model Config'
  });
};

// Save new SystemsModelConfiguration
systemsModelConfigurationsController.save = function(req, res) {
  var systemsModelConfiguration = new SystemsModelConfiguration(req.body);

  systemsModelConfiguration.save(function(err) {
    if(err) {
      console.log(err);
      res.render("systemsModelConfigurations/create");
    } else {
      console.log("Successfully created new SystemsModelConfiguration.");
      res.redirect("/systems-model-configurations/show/"+systemsModelConfiguration._id);
    }
  });
};

// Edit SystemsModelConfiguration
systemsModelConfigurationsController.edit = function(req, res) {
  SystemsModelConfiguration.findOne({_id: req.params.id}).exec(function (err, systemsmodelconfiguration) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("systemsModelConfigurations/edit", {
        title: 'Edit Systems Model Config',
        systemsmodelconfiguration: systemsmodelconfiguration
      });
    }
  });
};

// Update SystemsModelConfiguration
systemsModelConfigurationsController.update = function(req, res) {
  SystemsModelConfiguration.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, description: req.body.description }}, { new: true }, function (err, systemsmodelconfiguration) {
    if (err) {
      console.log(err);
      res.render("systemsModelConfigurations/edit", {
        title: 'Update Systems Model Config',
        systemsmodelconfiguration: req.body
      });
    }
    res.redirect("/systems-model-configurations/show/"+systemsmodelconfiguration._id);
  });
};

// Delete SystemsModelConfiguration
systemsModelConfigurationsController.delete = function(req, res) {
  SystemsModelConfiguration.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Systems Model Configuration deleted!");
      res.redirect("/systems-model-configurations");
    }
  });
};

// Export controller.
module.exports = systemsModelConfigurationsController;
