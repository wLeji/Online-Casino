import React from 'react';

import AccountMenu from './AccountMenu';
import MoneyCount from './MoneyCount';
import GamesHeader from './GamesHeader';

import './Header.css';

const HeaderComponent = () => {
    return (
        <header>
            <h1>my app</h1>
            <GamesHeader />
            <div id="header-right">
                <MoneyCount />
                <AccountMenu />
            </div>
        </header>
    );
};

export default HeaderComponent;