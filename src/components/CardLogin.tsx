import React from 'react';
import { FiX } from 'react-icons/fi';
import '../styles/components/card-loign.css';

const img = '/images/perfil-m.jpg';

const CardLogin = () => (
    <div className="box-shadow recent">
        <div className="close">
            <button
                className="btn"
                type="button"
                onClick={() => alert('Remover card login')}
            >
                <FiX color="#FFF" size={15} title="Remover" />
            </button>
        </div>
        <a href="#user">
            <img width={200} height={200} src={img} alt="Rodrigo"/>
            <div className="name-user">
                <span>Rodrigo</span>
            </div>
        </a>
    </div>
);

export default CardLogin;
