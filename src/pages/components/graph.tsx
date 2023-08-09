import React, { useContext } from 'react' 
import { AppContext } from '../context/context';
import { Scatterplot } from './scatterplot/scatterplot';

const Graph : React.FC = () => {
    const { state, dispatch } = useContext(AppContext)
    console.log(state.categoryData)
    return(
        <div></div>
    )
}

export default Graph;
