import React, { useContext, useEffect } from 'react' 

import { AppContext } from '../context/context';
import { Scatterplot } from './scatterplot/scatterplot';
import { api } from '~/utils/api';
import { CategoryEnum, CategoryIdMapping } from '~/utils/categories';
import { Types } from '../context/reducers';


type Props = {
    className: string
}

const Graph : React.FC<Props> = ({ className }) => {
    const { state, dispatch } = useContext(AppContext)
    const res = api.router.getAppsByCategory.useQuery(CategoryIdMapping[state.currentCategory] as CategoryEnum)
     
    useEffect(() => {
            switch(res.status) { 
                case 'loading': {
                    dispatch({ 
                        type: Types.ToggleLoading, 
                        payload: { isLoading: true }
                    })
                }
                case 'success': {
                    if (res.data) {
                        dispatch({ 
                            type: Types.ToggleLoading, 
                            payload: { isLoading: false}
                        })
                        dispatch({
                            type: Types.UpdateData, 
                            payload: {
                                categoryData:{
                                    id: res.data.id, 
                                    name: res.data.name, 
                                    genres: res.data.genres
                                }
                            }
                        })
                    }
                } 
                case 'error': {

                }
            }
        }, [res.status])
        
    return(
        <div className={`flex flex-col justify-start ${className}`}>
            <Scatterplot className='' width={500} height={500}/>
        </div>
    )
}

export default Graph;
