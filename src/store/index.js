import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { persistStore, persistReducer } from 'redux-persist';
import cartSlice from './cartSlice';

const persistConfig = {
  key: 'root',
  storage: localForage,
}

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware() })

export const persistor = persistStore(store);

// store.subscribe(() => console.log(store.getState()))

export default store;