import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { uploadImagesApi } from './upload/upload.service'
import categorySlice from './categoies/categorySlice'
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
// import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const rootReducer = combineReducers({
    [uploadImagesApi.reducerPath]: uploadImagesApi.reducer,
    categories: categorySlice,
    [categoryApi.reducerPath]: categoryApi.reducer
} )

const middleware = [
    uploadImagesApi.middleware,categoryApi.middleware
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