import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

type Props = {
    children: React.ReactNode,
    header: string,
    isOpen: boolean,
    onClose: Function,
};

const modalRoot = document.getElementById('modal-root');

const Modal = (props: Props) => {
    const {
        children,
        header,
        isOpen,
        onClose,
    } = props;
    const modalElement = document.createElement('div');

    useEffect(() => {
        modalRoot.appendChild(modalElement);
   
        return () => {
            modalRoot.removeChild(modalElement);
        }
    });

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        (
            <div className="modal">
                <div className={styles.header}>
                    {header}
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>
        ), 
        modalRoot
    );
};

export default Modal;
