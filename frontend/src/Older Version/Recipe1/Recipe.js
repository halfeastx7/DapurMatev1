import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Styles/Recipe.css';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/recipe')
            .then((response) => response.json())
            .then((data) => setRecipes(data))
            .catch((error) => console.error('Error fetching recipes:', error));
    }, []);

    // Filter recipes based on search term, selected cuisine, selected category, and ingredients
    const filteredRecipes = recipes.filter((recipe) => {
        return (
            (recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (selectedCuisine === '' || recipe.cuisine === selectedCuisine) &&
            (selectedCategory === '' || recipe.category === selectedCategory)
        );
    });

    // Get unique cuisines and categories for filtering
    const cuisines = [...new Set(recipes.map(recipe => recipe.cuisine))];
    const categories = [...new Set(recipes.map(recipe => recipe.category))];

    const handleClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    const handleAddRecipe = () => {
        navigate('/add-recipe');
    };

    return (
        <div className="recipe-container">
            <h1 className="recipe-title">Our Delicious Recipes</h1>

            {/* Search and Filter Section */}
            <div className="filter-section">
                <input
                    type="text"
                    placeholder="Search by title or ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}>
                    <option value="">All Cuisines</option>
                    {cuisines.map((cuisine, index) => (
                        <option key={index} value={cuisine}>{cuisine}</option>
                    ))}
                </select>

                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Display filtered recipes or a "No recipes found" message */}
            {filteredRecipes.length > 0 ? (
                <div className="recipe-grid">
                    {filteredRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="recipe-card"
                            onClick={() => handleClick(recipe._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h2>{recipe.title}</h2>
                            <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
                            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                            <p><strong>Category:</strong> {recipe.category}</p>
                            <p><strong>Servings:</strong> {recipe.servings}</p>
                            <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
                            <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
                            <p><strong>Total Time:</strong> {recipe.totalTime}</p>
                            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-recipes-found">
                    <p>No recipes found. Try adjusting your search or filter criteria.</p>
                    <button onClick={handleAddRecipe}>Add Your Own Recipe</button>
                </div>
            )}
        </div>
    );
};

export default Recipe;
