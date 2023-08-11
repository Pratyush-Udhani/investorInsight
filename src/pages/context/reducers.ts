import { CategoryDataType, InteractionDataType } from "./context";

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
    SetCurrentCategory = "SET_CURRENT_CATEGORY", 
    ToggleLoading = "TOGGLE_LOADING", 
    SetInteractionData = "SET_INTERACTION_DATA"
}

type AppPayload = {
    [Types.UpdateData]: {
        categoryData: CategoryDataType
    },
    [Types.SetCurrentCategory]: {
        currentCategory: string,
    }, 
    [Types.ToggleLoading]: {
        isLoading: boolean
    },
    [Types.SetInteractionData]: {
        interactionData: InteractionDataType
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
    state: string, 
    action: AppActions
) => {
    switch (action.type) {

        case Types.SetCurrentCategory: {
            state = action.payload.currentCategory
            return state;
        };
        default: 
            return state
    }
}

export const loadingReducer = (
    state: boolean, 
    action: AppActions
) => {
    switch(action.type) {
        case Types.ToggleLoading: {
            state = action.payload.isLoading
            return state
        }
        default: 
            return state; 


    }
}

export const interactionReducer = (
    state: InteractionDataType,
    action: AppActions
) => {
    switch(action.type) {
        case Types.SetInteractionData: {
            state = action.payload.interactionData
            return state
        }
        default: 
            return state
    }
}
