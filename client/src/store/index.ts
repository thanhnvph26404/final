import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { uploadImagesApi } from './upload/upload.service'
import categorySlice from './categoies/categorySlice'
import voucherSlice from './voucher/voucher'
import { voucherApi } from './voucher/voucher.service'
import { productApi } from './products/product.services'
import { productVariantApi } from './productVariant/productVariant.services'
import
{
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { categoryApi } from './categoies/category.services'
import authApi, { authReducer } from './Auth/Auth.services'
import AuthSlice from './Auth/Auth.Slice'
import { colorApi } from './valueAttribute/colorsevice'
import { sizeApi } from './valueAttribute/Sizesevice'
import { brandApi } from './Brand/brand.services'
import { orderReducer } from './Order/Order.slice'


// import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ "cart" ]
}

const rootReducer = combineReducers( {
    [ uploadImagesApi.reducerPath ]: uploadImagesApi.reducer,
    categories: categorySlice,
    [ categoryApi.reducerPath ]: categoryApi.reducer,
    [ authApi.reducerPath ]: authReducer,
    users: AuthSlice,
    vouchers: voucherSlice,
    order: orderReducer,
    [ voucherApi.reducerPath ]: voucherApi.reducer,
    [ productApi.reducerPath ]: productApi.reducer,
    [ productVariantApi.reducerPath ]: productVariantApi.reducer,
    [ colorApi.reducerPath ]: colorApi.reducer,
    [ sizeApi.reducerPath ]: sizeApi.reducer,
    [ brandApi.reducerPath ]: brandApi.reducer,

} )

const middleware = [
    uploadImagesApi.middleware,
    categoryApi.middleware,
    authApi.middleware,
    voucherApi.middleware,
    productApi.middleware,
    productVariantApi.middleware,
    colorApi.middleware,
    brandApi.middleware,

    sizeApi.middleware
]

const persistedReducer = persistReducer( persistConfig, rootReducer )

export const store = configureStore( {
    reducer: persistedReducer,
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware( {
            serializableCheck: {
                ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
            },
        } ).concat( ...middleware ),
} )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default persistStore( store );