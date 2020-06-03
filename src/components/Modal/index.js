import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import If from '../If';
import './Modal.scss';

const Modal = props => {

    const [isOpenState, setIsOpenState] = useState();

    
    useEffect(()=>{
        if(props.isOpen){
            setIsOpenState(true)
        } else {
            setIsOpenState(false)
        }
    }, []);
    

    return (
        
        <If
            condition={isOpenState}
            renderIf={
                ReactDOM.createPortal(
                    <div className="modal" onClick={() => setIsOpenState(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Sorry!</h2> 
                            <p>The service is unavailable ...</p>
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