import React from 'react';

const Fancy3Buttons = (props) => {
    return (
        <div className='button-container'>
            <a className="button" onClick={props.onClick} style={{ '--color': '#1e9bff' }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {props.text1}
            </a>
            <a className="button" onClick={props.onClick} style={{ "--color": "#ff1867" }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {props.text2}
            </a>
            <a className="button" onClick={props.onClick} style={{ "--color": "#6eff3e" }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {props.text3}
            </a>
        </div>
    );
};

export default Fancy3Buttons;
