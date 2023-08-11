import React, { useContext, useEffect } from 'react';
import Header from './components/accessibility/header';
import Graph from './components/graph';
import { api } from '~/utils/api';
import { CategoryEnum } from '~/utils/categories';
import { AppContext } from './context/context';
import { Types } from './context/reducers';

const Home : React.FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const res = api.router.getAppsByCategory.useQuery(CategoryEnum.ART_AND_DESIGN)

    useEffect(() => {
        if (state.categoryData.id === -1) {
            // first fetch
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
        }
    }, [res.status])

    return (
        <>
            <div className="flex flex-col w-screen px-12 pt-12 h-screen">
                <Header className='w-full h-fit'/>
                <Graph className='grow'/>
                {state.loading && ( 
                    <div className='bg-backdrop inset-0 absolute'>
                        <p className='text-white'>Structuring your data from google sheets. Don't worry this happen once per category</p>
                    </div>
                    )
                }
            </div>
        </>
    );
}

export default Home; 

