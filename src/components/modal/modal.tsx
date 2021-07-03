import React, { useCallback, useEffect } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

type Props = {
    children: React.ReactNode,
    title: string,
    onClose: () => void,
};

const Modal = (props: Props) => {
    const {
        children,
        title,
        onClose,
    } = props;
    const modalRoot = document.getElementById('modal-root')!;

    const escape = useCallback(event => {
        if (event.keyCode === 27) {
            onClose();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escape);

        return () => {
            document.removeEventListener("keydown", escape);
        }
    });

    return ReactDOM.createPortal(
        (
            <div className={styles.overlay}>
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
            </div>
        ),
        modalRoot
    );
};

Modal.defaultProps = {
    title: "",
};

export default Modal;
