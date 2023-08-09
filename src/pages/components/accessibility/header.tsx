import React, { useContext } from "react"
import Toggle from "./toggle_mode"
import { categories, CategoryIdMapping } from "~/utils/categories"
import { AppContext } from "~/pages/context/context"
import { Types } from "~/pages/context/reducers"

const Header: React.FC = () => {
    const {state, dispatch} = useContext(AppContext)

    return(
        <div className="w-full h-fit flex flex-row justify-between ">
            <div className="flex flex-col justify-start">
                <p className='text-primary text-sub_head select-none pb-2'>
                    categories
                </p>
                <select
                    className='p-2 rounded-sm bg-button_bg border border-border text-text_white text-base cursor-pointer hover:border-white'>
                    {
                        categories.map((category) => (
                            <option className='' key={CategoryIdMapping[category]}>{category}</option>
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
