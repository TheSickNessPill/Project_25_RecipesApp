import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCategoriesToState } from "../state/recipesSlice";

import "./../styles/RecipesHeader.css";

function RecipesHeader(props) {
    const [categories, setCategories] = React.useState([]);
    const stateCategories = useSelector(state => state.recipes.categories);
    const dispatcher = useDispatch();

    React.useEffect(
        () => {
            if (!categories.length) {
                axios.get("http://localhost:8000/recipes/")
                    .then((response) => {
                        const categoriesList = response.data.categories;
                        dispatcher(addCategoriesToState(categoriesList));
                        setCategories(categoriesList)
                        console.log("categoriesList", categoriesList);
                    });
            }
        },
        []
    );

    return (
        <header>
            <h1 className="header-title"> Рецепты Блюд </h1>
            <nav>
                <Link className="nav-link" to="/"> Home </Link>
                {
                    categories.map((category) => {
                        return <Link
                            className="nav-link"
                            key={category}
                            to={`/recipes?category=${category}`}>
                                {category}
                        </Link>
                    })
                }

                <Link className="nav-link" to="/documentation"> API DOC </Link>
            </nav>
        </header>
    )

}

export default RecipesHeader;