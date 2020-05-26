import React from 'react';
import { useFilter } from '../../context/Filter';
import './RightMenu.scss';

const RightMenu = () => {

    const {setFilter} = useFilter();

    return(
        <nav>
            <ul className="menu">
                <li className="menu__item menu__item--all" onClick={() => setFilter("all")}> All</li>
                <li className="menu__item menu__item--online" onClick={() => setFilter("online")}> Online</li>
                <li className="menu__item menu__item--offline" onClick={() => setFilter("offline")}> Offline</li>
            </ul>
        </nav>
    );
};

export default RightMenu;