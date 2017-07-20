/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('settings', {
    title: 'Settings'
  });
};
