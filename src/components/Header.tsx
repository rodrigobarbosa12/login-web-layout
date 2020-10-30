import React from 'react';
import { useHistory } from 'react-router-dom';
import cookies from 'js-cookie';
import { FiLogOut } from 'react-icons/fi';
import { CHAVE_TOKEN } from '../utils/constants';
import '../styles/components/header.css';

const Header = () => {
    const history = useHistory();

    const signOut = () => {
        cookies.remove(CHAVE_TOKEN);
        history.replace('/login');
    };

    return (
        <div className="header">
            <div>
                <button className="btn" type="button" onClick={signOut}>
                    <FiLogOut size={20} color="#FFF" />
                </button>
            </div>
        </div>
    );
};

export default Header;