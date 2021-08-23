import PropTypes from 'prop-types';
import React, { useRef, useCallback, useEffect } from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    const { children, onClose } = props;
    const modalOverlayRef = useRef(document.createElement('div'));

    const onEscapeClose = useCallback(event => {
        const escapeKeyCode = 27;
        if (event.keyCode === escapeKeyCode) {
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

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
