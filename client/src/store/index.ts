import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { uploadImagesApi } from './upload/upload.service'
import categorySlice from './categoies/categorySlice'
import voucherSlice from './voucher/voucher'
import { voucherApi } from './voucher/voucher.service'
import { productApi } from './products/product.services'
import { valueAttributeApi } from './valueAttribute/valueAttribute.services'
import { productVariantApi } from './productVariant/productVariant.services'
import {
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

// import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [""]
}

const rootReducer = combineReducers({
    [uploadImagesApi.reducerPath]: uploadImagesApi.reducer,
    categories: categorySlice,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authReducer,
    users: AuthSlice,
    vouchers: voucherSlice,
    [voucherApi.reducerPath]: voucherApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [valueAttributeApi.reducerPath]: valueAttributeApi.reducer,
    [productVariantApi.reducerPath]: productVariantApi.reducer,

})

const middleware = [
    uploadImagesApi.middleware,
    categoryApi.middleware,
    authApi.middleware,
    voucherApi.middleware,
    productApi.middleware,
    valueAttributeApi.middleware,
    productVariantApi.middleware
]

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default persistStore(store);