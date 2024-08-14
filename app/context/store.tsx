
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice'; 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
    reducer: {
        userReducer
    },
})
export default store

export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;