import React , { createContext, useState, useContext }from 'react';

const FilterContext = React.createContext();

const FilterProvider = ({children}) => {
    const [filter, setFilter] = useState("all");


    return(
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterProvider;

export function useFilter() {
    const context = useContext(FilterContext);
    const { filter, setFilter } = context;
    return { filter, setFilter };
}