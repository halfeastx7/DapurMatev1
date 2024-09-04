const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a recipe by ID
exports.updateRecipeById = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a recipe by ID
exports.deleteRecipeById = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search for recipes by title
exports.searchRecipes = async (req, res) => {
    try {
        const query = req.query.query;
        const recipes = await Recipe.find({
            title: { $regex: query, $options: 'i' }
        }).limit(5); // Limit to 5 suggestions
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipes' });
    }
};