import React from 'react';
import Header from './components/accessibility/header';
import Graph from './components/graph';
import DataFetcher from './components/fetcher';
import { api } from '~/utils/api';
import { CategoryEnum } from '~/utils/categories';

const Home : React.FC = () => {
    return (
        <div className="flex flex-row justify-center w-screen p-12 h-screen">
            <DataFetcher>
                <Header />
                <Graph />
            </DataFetcher>
        </div>
    );

}

export default Home; 

