import React, { Dispatch, createContext, useReducer } from 'react'; 
import { CategoryMapping, CategoryEnum } from '~/utils/categories';
import { AppActions, graphReducer } from './reducers';

export type App = {
     id: number,
     name: string,
     rating: number,
     reviews_number: number,
     size: string,
     installs: string,
     price: string,
     content_rating: string,
     version: string,
     last_updated: string,
     android_ver: string,
     genreId: number,
}

export type Genre = {
    id: number, 
    name: string, 
    categoryId: number, 
    apps: App[]
}

export type CategoryDataType = {
    id: number, 
    name: string, 
    genres: Genre[]
}

type initialStateType = {
    categoryData: CategoryDataType
}

const initialState = {
    categoryData: {
        id: -1, 
        name: "",
        genres: []
    }
}

const AppContext = createContext<{
    state: initialStateType; 
    dispatch: Dispatch<AppActions>
}>({
   state: initialState, 
   dispatch: () => null
});

const mainReducer = (
    { categoryData } : initialStateType, 
    action: AppActions
) => ({
    categoryData: graphReducer(categoryData, action)
});

const AppProvider = ({ children } : { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    return (
        <AppContext.Provider value = {{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }



