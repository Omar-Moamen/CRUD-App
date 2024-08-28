import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import auth from "./auth/authSlice";
import products from './products/productsSlice';



//! There is a better method for persistConfig
// const rootPersistConfig = {
//    key: "root",
//    storage,
//    whitelist: ["auth"],
// }

const authPersistConfig = {
   key: "auth",
   storage,
   whitelist: ["user", "token"],
}

const rootReducer = combineReducers({
   products,
   auth: persistReducer(authPersistConfig, auth),
})


const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
         }
      }))

})

export const persistor = persistStore(store);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;