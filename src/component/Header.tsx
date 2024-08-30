import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header(): React.JSX.Element {
    return (
        <div className="absolute top-0 left-0 m-4">
            <Link to="/">
                <img src={logo} alt="Logo" className="h-15 w-40" />
            </Link>
        </div>
    );
}

export default Header;