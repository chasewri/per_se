var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

// you're in recipes here
router.get('/', recipesCtrl.index);
router.get('/myRecipes', isLoggedIn, recipesCtrl.myRecipes);
router.get('/new', isLoggedIn, recipesCtrl.new);
router.post('/add', isLoggedIn, recipesCtrl.create);
router.get('/:id', recipesCtrl.show);
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit);
router.put('/:id', isLoggedIn, recipesCtrl.update);
router.delete('/:id', isLoggedIn, recipesCtrl.delete);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
