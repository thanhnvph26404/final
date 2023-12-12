import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    orders: [] as any[],
    quantity: 1 as number
};

const orderSlice = createSlice( {
    name: 'order',
    initialState,
    reducers: {
        addOrder: ( state, action: PayloadAction<any> ) =>
        {
            state.orders.push( action.payload );
        },
        updateOrderStatus: ( state, action: PayloadAction<{ orderId: string; status: string }> ) =>
        {
            const { orderId, status } = action.payload;
            const orderToUpdate = state.orders.find( ( order ) => order._id === orderId );
            console.log( orderToUpdate );

            if ( orderToUpdate )
            {
                orderToUpdate.status = status;
            }
        },
    },

} );

export const { addOrder, updateOrderStatus } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
