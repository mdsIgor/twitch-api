import React from 'react';
import './Spinner.scss';

const Spinner = (props) => {
    return (
        <div className="spinner">
            <span className="spinner__elem loader">&nbsp;</span>
            <div className="spinner__text">
                {props.text}
            </div>
        </div>
    )
}


Spinner.defaultProps = {
    text: 'Loading...'
}

export default Spinner;