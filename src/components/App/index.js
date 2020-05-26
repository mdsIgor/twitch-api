import React from 'react';
import Header from '../Header';
import StreamList from '../StreamList';
import FilterProvider from '../../context/Filter';
import '../../styles/base.scss';

const App = () => {
    return(
        <FilterProvider>
            <div> 
                <Header/>
                <StreamList />
            </div>
        </FilterProvider>
    );
};

export default App;