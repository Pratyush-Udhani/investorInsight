import React, { useContext } from 'react' 
import { AppContext } from '../context/context';
import { Scatterplot } from './scatterplot/scatterplot';

const Graph : React.FC = () => {
    const { state, dispatch } = useContext(AppContext)
    return(
        <div>
        </div>
    )
}

export default Graph;
