const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cuisine: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    servings: { type: Number, required: true },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    totalTime: { type: String, required: true },
});

const Recipe = mongoose.model('recipe', recipeSchema, 'recipe');

module.exports = Recipe;
