import React from 'react';
import RightMenu from '../RightMenu';
import Container from '../Container';
import './Header.scss';

const Header = () => {
    return(
        <header className="header">
            <Container>
                <h1 className="header-title">Twitch Streamers</h1>
                <RightMenu/>
            </Container>
        </header>
    );
};

export default Header;