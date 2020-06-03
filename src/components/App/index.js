import React from 'react';
import Header from '../Header';
import StreamList from '../StreamList';
import FilterProvider from '../../context/Filter';
import Modal from '../Modal';
import '../../styles/base.scss';

const App = () => {
    return(
        <FilterProvider> 
            <Header/>
            <StreamList />
        </FilterProvider>
        
    );
};

export default App;