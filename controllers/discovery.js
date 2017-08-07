// Create Controller Object.
const discoveryController = {};

// Define Controller Methods.
discoveryController.discover = (req, res) => {
  res.render('discovery/workspace', {
    title: 'Discovery Space'
  });
};

discoveryController.configure = (req, res) => {
  res.render('discovery/configure', {
    title: 'Discovery Config'
  });
};

// Export Controller.
module.exports = discoveryController;
