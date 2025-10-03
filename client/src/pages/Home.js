import React from 'react';
import { Link } from 'react-router-dom';

function Home(){
    return (
        <div className='home-container'>
            <h1>Bem-vindo ao Sistema de indicação!</h1>
            <nav>
                <ul>
                    <li><Link to="/register">Registrar</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/profile">Perfil</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;