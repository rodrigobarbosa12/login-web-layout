import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/pages/home.css';

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <Header />
        </div>
    );
};

export default Home;