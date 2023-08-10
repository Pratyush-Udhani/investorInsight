import { CategoryEnum } from "~/utils/categories";
import { CategoryDataType, CurrentCategoryDataType } from "./context";

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
            type: Key;
        } : {
            type: Key; 
            payload: M[Key];
        }
};

export enum Types {
    UpdateData = "UPDATE_DATA", 
    SelectCategory = "SELECT_CATEGORY", 
    SetFetched = "SET_FETCHED"
}

type AppPayload = {
    [Types.UpdateData]: {
        categoryData: CategoryDataType
    },
    [Types.SelectCategory]: {
        category: CategoryEnum,
    }, 
    [Types.SetFetched]: {
        isFetched: boolean
    }
}

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export const graphReducer = (
    state:CategoryDataType, 
    action: AppActions
) => {
    switch (action.type) {
        case Types.UpdateData: {
            state = {
                id: action.payload.categoryData.id, 
                name: action.payload.categoryData.name, 
                genres: action.payload.categoryData.genres
            }
        }
        default: 
            return state;
    }
}

export const categoryReducer = (
    state: CurrentCategoryDataType, 
    action: AppActions
) => {
    switch (action.type) {
        case Types.SelectCategory: {
            state = {
                ...state, 
                currentCategory: action.payload.category
            }; 
            return state;
        };
        case Types.SetFetched: {
            state = {...state, isFetched: action.payload.isFetched}
            return state; 
        };
        default: 
            return state
    }
}














