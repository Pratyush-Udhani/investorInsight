import { CategoryDataType } from "./context";

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
    SelectCategory = "SELECT_CATEGORY", 
}

type AppPayload = {
    [Types.SelectCategory]: {
        categoryData: CategoryDataType
    }, 
}

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export const graphReducer = (
    state:CategoryDataType, 
    action: AppActions
) => {
    switch (action.type) {
        case Types.SelectCategory: {
            console.log("in reducer")
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
















