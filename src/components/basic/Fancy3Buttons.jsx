import React from 'react';

const Fancy3Buttons = (props) => {
    return (
        <a className="button" onClick={props.onClick} style={{ '--color': `${props.color}` }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {props.text}
            </a>
    );
};

export default Fancy3Buttons;

// '#1e9bff'
// "#ff1867"
// "#6eff3e"