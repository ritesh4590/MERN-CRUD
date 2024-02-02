import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'

const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // This disables the serializable check
        }).concat(),
})

export default store