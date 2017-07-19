/**
 * GET /
 * Vue-test page.
 */
exports.index = (req, res) => {
  res.render('vue-test', {
    title: 'Vue-test'
  });
};
