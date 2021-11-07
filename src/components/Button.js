import React from 'react';

export default function Button(props) {
    const { handleClick, children } = props;
    // eslint-disable-next-line no-restricted-globals
    const isOperator = (val) => !isNaN(val) || val === '.' || val === '=';
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={`button ${isOperator(children) ? '' : 'operator'}`}
            onClick={() => handleClick(children)}
        >
            {children}
        </div>
    );
}
