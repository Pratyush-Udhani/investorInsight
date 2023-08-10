import React, { Dispatch, createContext, useReducer } from 'react'; 
import { CategoryMapping, CategoryEnum } from '~/utils/categories';
import { AppActions, categoryReducer, graphReducer } from './reducers';

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

export type CurrentCategoryDataType = {
    currentCategory: CategoryEnum, 
    isFetched: boolean
}

type initialStateType = {
    categoryData: CategoryDataType, 
    currentCategoryData: CurrentCategoryDataType
}

const initialState = {
    categoryData: {
        id: -1, 
        name: "",
        genres: []
    }, 
    currentCategoryData: { 
        currentCategory: CategoryEnum.ART_AND_DESIGN, 
        isFetched: false
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
    { categoryData, currentCategoryData } : initialStateType, 
    action: AppActions
) => ({
    categoryData: graphReducer(categoryData, action), 
    currentCategoryData: categoryReducer(currentCategoryData, action)
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



