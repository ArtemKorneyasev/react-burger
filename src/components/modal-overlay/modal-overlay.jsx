import React, { useRef, useCallback, useEffect } from 'react';
import styles from './modal-overlay.module.css';

type Props = {
    children: React.ReactNode,
    onClose: () => void,
};

const ModalOverlay = (props: Props) => {
    const { children, onClose } = props;
    const modalOverlayRef = useRef(document.createElement('div'));

    const onEscapeClose = useCallback(event => {
        if (event.keyCode === 27) {
            onClose();
        }
    }, [onClose]);

    const onOverlayClose = React.useCallback(({ target }) => {
        if (modalOverlayRef.current === target) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", onEscapeClose);
        document.addEventListener("click", onOverlayClose);

        return () => {
            document.removeEventListener("keydown", onEscapeClose);
            document.removeEventListener("click", onOverlayClose);
        }
    });

    return (
        <div
            ref={modalOverlayRef}
            className={styles.overlay}
        >
            {children}
        </div>
    );
};

export default ModalOverlay;
