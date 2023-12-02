import React from "react";

import RecipesHeader from "./RecipesHeader";
import RecipesBody from "./RecipesBody";
import DishInfo from "./DishInfo";
import Documentation from "./Documentation";

import "../styles/App.css";
import { Routes, Route } from "react-router-dom";

function App(props) {
    return (
        <Routes>
            <Route path="/" element={
                <React.Fragment>
                    <RecipesHeader />
                </React.Fragment>
            } />

            <Route path="/documentation" element={
                <React.Fragment>
                    <RecipesHeader />
                    <Documentation />
                </React.Fragment>
            } />

            <Route path="/recipes" element={
                <React.Fragment>
                    <RecipesHeader />
                    <RecipesBody />
                </React.Fragment>
            }>
            </Route>
            <Route path="/recipes/dishinfo" element={<DishInfo />}></Route>
        </Routes>
    );
}


export default App;