"use client"

import { api } from '~/utils/api'
import { CategoryEnum } from '~/utils/categories';
import { data } from '~/utils/data';
import { Scatterplot } from './components/scatterplot';

export default function Home() {
    return (
        <div className="w-full h-full flex justify-center">
            <Scatterplot data={data} width={600} height={600} />
        </div>
    );
}
