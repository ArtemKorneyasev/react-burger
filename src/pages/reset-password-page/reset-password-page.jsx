import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserResetPassword, clearResetPasswordError } from '../../services/actions/userActions';
import { openResetPasswordModal, closeModal } from '../../services/actions/modalActions';
import Modal from '../../components/modal/modal';
import styles from './reset-password-page.module.css';

const ResetPasswordPage = () => {
    const [state, setState] = useState({
        password: '',
        token: '',
    });
    const {
        resetPasswordResult,
        resetPasswordError,
    } = useSelector(state => state.user);
    const { modalIsOpen, modalMode } = useSelector(state => state.modal);

    const onChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const history = useHistory();
    const dispatch = useDispatch();
    const resetPasswordHandler = useCallback(() => {
        const { password, token } = state;
        dispatch(getUserResetPassword({ password, token }));
    }, [state, dispatch]);

    useEffect(() => {
        if (resetPasswordError) {
            dispatch(openResetPasswordModal());
        }
    }, [dispatch, resetPasswordError]);

    if (resetPasswordResult.success) {
        return (
            <Redirect to={{ pathname: '/login' }} />
        );
    }

    return (
        <>
            <div className={styles.root}>
                <span className="text text_type_main-medium">
                    Восстановление пароля
                </span>
                <div className={styles.input}>
                    <PasswordInput
                        onChange={onChange}
                        value={state.password}
                        name="password"
                    />
                </div>
                <div className={styles.input}>
                    <Input
                        placeholder="Введите код из письма"
                        onChange={onChange}
                        value={state.token}
                        name="token"
                    />
                </div>
                <div className={styles.btn}>
                    <Button
                        type="primary"
                        size="medium"
                        onClick={resetPasswordHandler}
                    >
                        Сохранить
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
                modalIsOpen && modalMode === 'reset-password' ? (
                    <Modal onClose={() => {
                        dispatch(clearResetPasswordError())
                        dispatch(closeModal())
                    }}>
                        <div className={`text text_type_main-default ${styles.retry} `}>
                            <span>
                                {resetPasswordError}
                            </span>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    dispatch(clearResetPasswordError())
                                    dispatch(closeModal())
                                    history.replace({ pathname: '/forgot-password' });
                                }}
                            >
                                Восстановить пароль
                            </Button>
                        </div>
                    </Modal>
                ) : null
            }
        </>
    );
};

export default ResetPasswordPage;
