import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Pastikan react-icons telah dipasang
// import './Styles/RecipeDetail.css';
const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Tukar dari useHistory ke useNavigate
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/recipe/${id}`)
            .then((response) => response.json())
            .then((data) => setRecipe(data))
            .catch((error) => console.error('Error fetching recipe:', error));
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-detail">
            <button className="back-button" onClick={() => navigate('/')}>
                <FaArrowLeft /> Back
            </button>
            <h1>{recipe.title}</h1>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
            <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
            <p><strong>Total Time:</strong> {recipe.totalTime}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
        </div>
    );
};

export default RecipeDetail;
