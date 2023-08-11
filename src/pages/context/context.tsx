import React, { Dispatch, createContext, useReducer } from 'react'; 
import { categories } from '~/utils/categories';
import { AppActions, categoryReducer, graphReducer, loadingReducer } from './reducers';

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
    categoryData: CategoryDataType, 
    currentCategory: string, 
    loading: boolean
}

const initialState = {
    categoryData: {
        id: -1, 
        name: "",
        genres: []
    }, 
    currentCategory: categories[0] as string, 
    loading: false
}

const AppContext = createContext<{
    state: initialStateType; 
    dispatch: Dispatch<AppActions>
}>({
   state: initialState, 
   dispatch: () => null
});

const mainReducer = (
    { categoryData, currentCategory, loading} : initialStateType, 
    action: AppActions
) => ({
    categoryData: graphReducer(categoryData, action), 
    currentCategory: categoryReducer(currentCategory, action), 
    loading: loadingReducer(loading, action)
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



