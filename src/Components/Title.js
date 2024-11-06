import React from 'react';
import '../Styles/title.css';

const Title = ({ text }) => {
    return (
        <div className="title-principal">
            <h1>{text}</h1>
        </div>
    );
};

export default Title;
