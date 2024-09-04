const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route to create a new recipe
router.post('/', recipeController.createRecipe);

// Route to get all recipes
router.get('/', recipeController.getAllRecipes);

// Route to get a specific recipe by ID
router.get('/:id', recipeController.getRecipeById);

// Route to update a recipe by ID
router.put('/:id', recipeController.updateRecipeById);

// Route to delete a recipe by ID
router.delete('/:id', recipeController.deleteRecipeById);

// Route to search for recipes by title
router.get('/search', recipeController.searchRecipes);

module.exports = router;
