import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type Props = {
    children: React.ReactNode,
    title: string,
    onClose: () => void,
};

const Modal = (props: Props) => {
    const { children, title, onClose } = props;
    const modalRoot = document.getElementById('modal-root');

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClose={onClose}>
                <div className={styles.modal}>
                    <div
                        className={
                            `text text_type_main-large
                            ${title ? styles.withTitle : styles.withoutTitle }`
                        }
                    >
                        {title}
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        ),
        modalRoot
    );
};

Modal.defaultProps = {
    title: "",
};

export default Modal;
