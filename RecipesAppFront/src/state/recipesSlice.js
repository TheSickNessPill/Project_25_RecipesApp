import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [],
    dishes: {},
    dishInfo: {}
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addCategoriesToState: (state, action) => {
            state.categories = action.payload;
        },
        addDishesToState: (state, action) => {
            state.dishes = action.payload
        },
        addDishInfoToState: (state, action) => {
            state.dish = action.payload
        }
    }
});

export const {addCategoriesToState, addDishesToState, addDishInfoToState} = recipesSlice.actions;

export default recipesSlice.reducer;
