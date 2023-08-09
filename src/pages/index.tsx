import React from 'react';
import Header from './components/accessibility/header';
import { api } from '~/utils/api'
import { Scatterplot } from './components/scatterplot';
import { data } from '~/utils/data';

export default function Home() {
    return (
        <div className="flex flex-row justify-center w-screen p-12 h-screen">
            <Header/>
        </div>
    );
}
