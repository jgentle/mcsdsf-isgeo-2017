const DataSource = require('../models/DataSource.js');
const dataController = {};

// List All
dataController.list = function(req, res) {
  DataSource.find({}).exec(function (err, datasources) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("datasources/index", {
        title: 'Data Sources',
        datasources: datasources
      });
    }
  });
};

// Find by _id
dataController.show = function(req, res) {
  DataSource.findOne({_id: req.params.id}).exec(function (err, datasource) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("datasources/show", {
        title: 'Data Source Details',
        datasource: datasource
      });
    }
  });
};

/**
 * Use DataSource.geospatialData:Boolean to distinguish between geospatial and non-geospatial datasources when:
 *  - parsing
 *  - listing
 **/

// Create (redirect to form)
dataController.upload = function(req, res) {
  res.render("datasources/upload", {
    title: 'Upload Data Source',
    dataTest: 'WTH'
  });
};

// Save new DataSource
dataController.save = function(req, res) {
  var datasource = new DataSource(req.body);

  datasource.save(function(err) {
    if(err) {
      console.log(err);
      res.render("datasources/upload");
    } else {
      console.log("Successfully created new DataSource.");
      res.redirect("/datasources/show/"+datasource._id);
    }
  });
};

// Delete DataSource
dataController.delete = function(req, res) {
  DataSource.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Data Source deleted!");
      res.redirect("/datasources");
    }
  });
};

// Export controller.
module.exports = dataController;
