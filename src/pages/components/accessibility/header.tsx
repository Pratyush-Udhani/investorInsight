import React, { useContext } from "react"
import Toggle from "./toggle_mode"
import { categories, CategoryIdMapping } from "~/utils/categories"
import { AppContext } from "~/pages/context/context"
import { Types } from "~/pages/context/reducers"

type Props = {
    className: string
}

const Header: React.FC<Props> = ({className}) => {
    const {state, dispatch} = useContext(AppContext)
    
    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: Types.SetCurrentCategory, 
            payload: {
                currentCategory: event.target.value
            }
        })

        //dispatch({ type: Types.StartFetch })
    }

    return(
        <div className={`flex flex-row justify-between ${className}`}>
            <div className="flex flex-col justify-start">
                <p className='text-primary text-sub_head select-none pb-2'>
                    categories
                </p>
                <select
                    value={state.currentCategory}
                    onChange={(event) => handleOnChange(event)}
                    className='p-2 rounded-sm bg-button_bg border border-border text-text_white text-base cursor-pointer hover:border-white'>
                    {
                        categories.map((category) => (
                            <option 
                                value={category}
                                className=''
                                key={CategoryIdMapping[category]}>
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='flex flex-row self-end'>
                <Toggle/>
            </div>
        </div>
    )
}

export default Header
