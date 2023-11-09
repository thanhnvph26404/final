import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iproductdata, IProductState } from "./product.interface";


const initialState: IProductState = {
    products: [],
    sortBy: ''
}

const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        loadProductList: (state, action: PayloadAction<Iproductdata[]>) => {
            state.products = action.payload;
        },
        sortByProduct: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload
            if(state.sortBy === 'price'){
                state.products = state.products.slice().sort((a:any, b:any) => a.price - b.price)
            }
        }

    }
})

export const { loadProductList, sortByProduct } = productSlice.actions;
export default productSlice.reducer;