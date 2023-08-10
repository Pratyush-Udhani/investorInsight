import React, { useContext } from 'react';
import { AppContext } from '../context/context';
import { api } from '~/utils/api';
import { CategoryEnum } from '~/utils/categories';
import { Types } from '../context/reducers';

const DataFetcher = ({ children }: { children: React.ReactNode }) => {
    const { state, dispatch } = useContext(AppContext);

    if (state.categoryData.id === -1) {
        const res = api.router.getAppsByCategory.useQuery(CategoryEnum.BEAUTY);
        if (res.status === 'success') {
            const category = res.data;
            if (category) {
                dispatch({
                    type: Types.SelectCategory, 
                    payload: {
                        categoryData: {
                            id: category.id, 
                            name: category.name,
                            genres: category.genres
                        }
                    }
                });
            }
        }
    }

    return <>{children}</>;
}

export default DataFetcher
