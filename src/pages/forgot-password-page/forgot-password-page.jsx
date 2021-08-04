import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserForgotPassword, clearForgotPasswordError } from '../../services/actions/userActions';
import { openForgotPasswordModal, closeModal } from '../../services/actions/modalActions';
import Modal from '../../components/modal/modal';
import styles from './forgot-password-page.module.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const {
        forgotPasswordResult,
        forgotPasswordError,
    } = useSelector(state => state.user);
    const { modalIsOpen, modalMode } = useSelector(state => state.modal);

    const onChangeEmail = event => setEmail(event.target.value);

    const dispatch = useDispatch();
    const forgotPasswordHandler = useCallback(() => {
        dispatch(getUserForgotPassword(email));
    }, [email, dispatch]);

    useEffect(() => {
        if (forgotPasswordError) {
            dispatch(openForgotPasswordModal());
        }
    }, [dispatch, forgotPasswordError]);

    if (forgotPasswordResult.success) {
        return (
            <Redirect to={{ pathname: '/reset-password' }} />
        );
    }

    return (
        <>
            <div className={styles.root}>
                <span className="text text_type_main-medium">
                    Восстановление пароля
                </span>
                <div className={styles.input}>
                    <EmailInput
                        onChange={onChangeEmail}
                        value={email}
                        name="email"
                    />
                </div>
                <div className={styles.btn}>
                    <Button
                        type="primary"
                        size="medium"
                        onClick={forgotPasswordHandler}
                    >
                        Восстановить
                    </Button>
                </div>
                <div className={`text text_type_main-default text_color_inactive ${styles.linkContainer}`}>
                    <span>Вспомнили пароль?</span>
                    <Link className={styles.link} to="/login">
                        Войти
                    </Link>
                </div>
            </div>
            {
                modalIsOpen && modalMode === 'forgot-password' ? (
                    <Modal onClose={() => {
                        dispatch(clearForgotPasswordError())
                        dispatch(closeModal())
                    }}>
                        <span className="text text_type_main-medium">
                            {forgotPasswordError}
                        </span>
                    </Modal>
                ) : null
            }
        </>
    );
};

export default ForgotPasswordPage;
