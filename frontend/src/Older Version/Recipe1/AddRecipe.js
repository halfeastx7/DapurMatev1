import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Styles/AddRecipe.css';

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Menggunakan URL untuk gambar
    const [cuisine, setCuisine] = useState('');
    const [category, setCategory] = useState('');
    const [servings, setServings] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [totalTime, setTotalTime] = useState(0);
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        setTotalTime(Number(prepTime) + Number(cookTime));
    }, [prepTime, cookTime]);

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecipe = {
            title,
            imageUrl, // Menggunakan URL yang diberikan oleh pengguna
            cuisine,
            category,
            servings,
            prepTime,
            cookTime,
            totalTime,
            ingredients: ingredients.filter(ingredient => ingredient.trim() !== ''),
            instructions,
        };

        console.log('Data to be sent:', newRecipe); // Log data yang akan dihantar

        fetch('http://localhost:5000/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Recipe added:', data);
                navigate(`/recipe/${data._id}`);
            })
            .catch((error) => console.error('Error adding recipe:', error));
    };

    const cuisineOptions = [
        "Italian", "Indian", "Russian", "American", "Thai",
        "Italian-American", "Japanese", "Mexican", "French",
        "Middle Eastern", "Chinese", "Malaysia"
    ];

    const categoryOptions = [
        "Main Course", "Breakfast", "Salad", "Soup", "Dip",
        "Dessert", "Appetizer", "Beverage", "Side Dish"
    ];

    return (
        <div className="add-recipe">
            <h1>Add Your Own Recipe</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                {/* Input untuk URL Gambar */}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                    <option value="">Select Cuisine</option>
                    {cuisineOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categoryOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Servings"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Prep Time (minutes)"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Cook Time (minutes)"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Total Time (minutes)"
                    value={totalTime}
                    readOnly
                />

                {/* Dynamic Ingredients Input */}
                <label>Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-input">
                        <input
                            type="text"
                            placeholder={`Ingredient ${index + 1}`}
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                        />
                        <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

                <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;
