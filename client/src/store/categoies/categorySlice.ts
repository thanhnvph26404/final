import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory, ICategoryState } from "./category.interface";

const initialState: ICategoryState = {
    categories: []
}

const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        addNewCategory: (state, action: PayloadAction<ICategory>) => {
            state.categories.push(action.payload)
        },
        loadCategoryList: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload
        },
        editNewCategory: (state, action: PayloadAction<ICategory>) => {
            const newCategory = action.payload
            state.categories = state.categories.map((category) => category._id === newCategory._id ? newCategory : category)
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter((category) => category._id !== action.payload)
        }

        }
})

export const { addNewCategory, loadCategoryList, editNewCategory, deleteCategory } = categorySlice.actions
export default categorySlice.reducer