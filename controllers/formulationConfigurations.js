const FormulationConfiguration = require('../models/FormulationConfiguration.js');

const formulationConfigurationsController = {};

// List All
formulationConfigurationsController.list = function(req, res) {
  FormulationConfiguration.find({}).exec(function (err, formulationconfigurations) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("formulationConfigurations/index", {
        title: 'Formulation Configs',
        formulationconfigurations: formulationconfigurations
      });
    }
  });
};

// Find by _id
formulationConfigurationsController.show = function(req, res) {
  FormulationConfiguration.findOne({_id: req.params.id}).exec(function (err, formulationconfiguration) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("formulationConfigurations/show", {
        title: 'Formulation Config Details',
        formulationconfiguration: formulationconfiguration
      });
    }
  });
};

// Create (redirect to form)
formulationConfigurationsController.create = function(req, res) {
  res.render("formulationConfigurations/create", {
    title: 'Create Formulation Config'
  });
};

// Save new FormulationConfiguration
formulationConfigurationsController.save = function(req, res) {
  var formulationConfiguration = new FormulationConfiguration(req.body);

  formulationConfiguration.save(function(err) {
    if(err) {
      console.log(err);
      res.render("formulationConfigurations/create");
    } else {
      console.log("Successfully created new FormulationConfiguration.");
      res.redirect("/formulation-configurations/show/"+formulationConfiguration._id);
    }
  });
};

// Edit FormulationConfiguration
formulationConfigurationsController.edit = function(req, res) {
  FormulationConfiguration.findOne({_id: req.params.id}).exec(function (err, formulationconfiguration) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("formulationConfigurations/edit", {
        title: 'Edit Formulation Config',
        formulationconfiguration: formulationconfiguration
      });
    }
  });
};

// Update FormulationConfiguration
formulationConfigurationsController.update = function(req, res) {
  FormulationConfiguration.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, description: req.body.description }}, { new: true }, function (err, formulationconfiguration) {
    if (err) {
      console.log(err);
      res.render("formulationConfigurations/edit", {
        title: 'Update Formulation Config',
        formulationconfiguration: req.body
      });
    }
    res.redirect("/formulation-configurations/show/"+formulationconfiguration._id);
  });
};

// Delete FormulationConfiguration
formulationConfigurationsController.delete = function(req, res) {
  FormulationConfiguration.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Formulation Configuration deleted!");
      res.redirect("/formulation-configurations");
    }
  });
};

// Export controller.
module.exports = formulationConfigurationsController;
