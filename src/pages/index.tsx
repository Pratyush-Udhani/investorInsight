import React from 'react';
import Header from './components/accessibility/header';
import Graph from './components/graph';
import DataFetcher from './components/fetcher';

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

