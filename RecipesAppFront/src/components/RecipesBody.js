import React from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addDishesToState } from "../state/recipesSlice"


import "../styles/RecipesBody.css";


function RecipesBody(props) {
    const [dishes, setDishes] = useState([]);

    const dispatcher = useDispatch();
    const stateDishes = useSelector(state => state.recipes.dishes);

    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);
    const category = query.get("category") || "";
    useEffect(
        () => {
            if (category.length > 0 && !(category in stateDishes)) {
                axios.get(`http://localhost:8000/recipes/categories/?category=${category}`)
                    .then(response => {
                        const dishesObj = response.data.dishes;
                        dispatcher(addDishesToState(dishesObj))
                        setDishes(dishesObj);
                        console.log(dishesObj);
                    });
            }
        }
    );

    return (
        <div className="recipes-body">
            <div className="dishes-list">
                <ul>
                    <li>{category}</li>
                    {
                        category.length > 0 && dishes[category] ?
                            dishes[category].map(
                                dish => <li key={dish}>
                                    <Link
                                        className="nav-link"
                                        key={dish}
                                        to={`/recipes/dishinfo/?dishname=${dish}`}>
                                            {dish}
                                    </Link>
                                </li>
                            ) : undefined
                    }
                </ul>
            </div>
        </div>
    );
}

export default RecipesBody;