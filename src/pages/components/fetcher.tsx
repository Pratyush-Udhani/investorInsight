import React, { useContext } from 'react';
import { AppContext } from '../context/context';
import { api } from '~/utils/api';
import { Types } from '../context/reducers';
import { CategoryEnum } from '~/utils/categories';

const DataFetcher = ({ children }: { children: React.ReactNode }) => {
    const { state, dispatch } = useContext(AppContext);

    if (state.currentCategoryData.isFetched === false) {
        const res =  api.router.getAppsByCategory.useQuery(state.currentCategoryData.currentCategory); 
        if (res.status === 'success') {
            const category = res.data; 
                if (category) {
                    dispatch({
                        type: Types.UpdateData, 
                        payload: {
                            categoryData: {
                                id: category.id, 
                                name: category.name,
                                genres: category.genres
                            }
                        }
                    });
                    dispatch({
                        type: Types.SetFetched, 
                        payload: { isFetched: true }
                    })
                }
        }
    }

    console.log(state.categoryData)
    return <>{children}</>;
}

export default DataFetcher
