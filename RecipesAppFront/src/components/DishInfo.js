import React from "react";
import axios from "axios";

import RecipesHeader from "./RecipesHeader";

import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addDishInfoToState } from "../state/recipesSlice"


import "../styles/DishInfo.css"


function DishInfo() {
    const [dishInfo, setDishInfo] = useState({});

    const dispatcher = useDispatch();
    const dishInfoState = useSelector(state => state.recipes.dishInfo);

    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);

    const dishName = query.get("dishname");
    useEffect(
        () => {
            if (Object.keys(dishInfo).length === 0 && !(dishName in dishInfoState)) {
                axios.get(`http://localhost:8000/recipes/dishinfo/?dishname=${dishName}`)
                    .then(response => {
                        const dish = response.data[dishName];
                        console.log(dish);
                        setDishInfo(dish);
                        dispatcher(addDishInfoToState(dish));
                    })
            }
        },
        []
    )

    return (
        <React.Fragment>
            <RecipesHeader />
            <hr />
           <main className="dish-info">
                <h1> {dishInfo.name} </h1>
                <img src={`data:image/jpeg;base64,${dishInfo.blob || ""}`}></img>

                <h3> Описание </h3>
                <p>{dishInfo.description}</p>

                <h3> Инградиенты </h3>
                <ul className="ingradients">
                    {
                        dishInfo.ingredients ?
                            dishInfo.ingredients.split("\r\n").map((row) => {
                                return <li key={row}> {row} </li>
                            }) :
                            undefined
                    }
                </ul>

                <h3> Приготовление блюда </h3>
                <ul className="cooking">
                    {
                        dishInfo.сooking_by_steps ?
                            dishInfo.сooking_by_steps.split("\r\n").map((row) => {
                                return <li key={row.slice(0, 6)}> {row} </li>
                            }) :
                            undefined
                    }
                </ul>
           </main>
        </React.Fragment>
    )
}

export default DishInfo;