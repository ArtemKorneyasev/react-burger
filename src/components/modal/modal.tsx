import { FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

interface IProps {
    children: React.ReactNode;
    title?: string;
    onClose: () => void;
}

const Modal: FC<IProps> = (props: IProps) => {
    const { children, title, onClose } = props;
    const modalRoot = document.getElementById('modal-root');

    return modalRoot ? ReactDOM.createPortal(
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
    ) : null;
};

export default Modal;
