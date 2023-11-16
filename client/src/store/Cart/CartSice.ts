import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartData } from './cartInterface';



interface CartState
{
    items: ICartData[];
}

export const cartSlice = createSlice( {
    name: 'cart',
    initialState: { items: [] } as CartState,
    reducers: {
        // ... your other reducers
        addToCart: ( state, action: PayloadAction<ICartData> ) =>
        {
            state.items.push( action.payload );
        },
    },
} );

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;