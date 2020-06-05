import React from 'react';
import ReactDOM from 'react-dom';
import If from '../If';
import './Modal.scss';

const Modal = props => {
    

    return (
        
        <If
            condition={props.isOpen}
            renderIf={
                ReactDOM.createPortal(
                    <div className="modal" onClick={() => console.log('arrumar aqui modal on click')}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Sorry!</h2> 
                            <p>The service is unavailable ...</p>
                            <p>Refresh the page (F5)</p>
                            <p>{props.error}</p>
                        </div>
                    </div>
                , document.querySelector('#modal'))
            }
        
        />
        
    )
}

Modal.defaultProps = {
    error: 'Generic Error',
    isOpen: false
}

export default Modal;