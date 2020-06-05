import React from 'react';
import { useFilter } from '../../context/Filter';
import './RightMenu.scss';

const RightMenu = () => {

    const {setFilter} = useFilter();
    const menuItems = {
        all: 'all',
        online: 'online',
        offline: 'offline'
    }

    return(
        <nav>
            <ul className="menu">
                {
                    Object
                        .values(menuItems)
                        .map( menuItem => {
                            return (
                                <li 
                                    className={`menu__item menu__item--${menuItem}`}
                                    id={menuItem} 
                                    onClick={() => setFilter(menuItem)}
                                >
                                    {menuItem}
                                </li>

                            ); 
                        }

                    )
                }
            </ul>
        </nav>
    );
};

export default RightMenu;