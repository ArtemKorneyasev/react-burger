import { FC, useRef, useCallback, useEffect } from 'react';
import styles from './modal-overlay.module.css';

interface IProps {
    children: React.ReactNode;
    onClose: () => void;
}

const ModalOverlay: FC<IProps> = (props: IProps) => {
    const { children, onClose } = props;
    const modalOverlayRef = useRef(document.createElement('div'));

    const onEscapeClose = useCallback(event => {
        const escapeKeyCode = 27;
        if (event.keyCode === escapeKeyCode) {
            onClose();
        }
    }, [onClose]);

    const onOverlayClose = useCallback(({ target }) => {
        if (modalOverlayRef.current === target) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', onEscapeClose);
        document.addEventListener('click', onOverlayClose);

        return () => {
            document.removeEventListener('keydown', onEscapeClose);
            document.removeEventListener('click', onOverlayClose);
        };
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
