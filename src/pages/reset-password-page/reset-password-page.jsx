import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserResetPassword, clearUserResetPasswordError } from '../../services/actions/userActions';
import { openUserResetPasswordModal, closeModal } from '../../services/actions/modalActions';
import Modal from '../../components/modal/modal';
import styles from './reset-password-page.module.css';

const ResetPasswordPage = () => {
    const [state, setState] = useState({
        password: '',
        token: '',
    });
    const {
        userResetPasswordSuccess,
        userResetPasswordError,
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
        dispatch(getUserResetPassword(state));
    }, [state, dispatch]);

    useEffect(() => {
        if (userResetPasswordError) {
            dispatch(openUserResetPasswordModal());
        }
    }, [dispatch, userResetPasswordError]);

    if (userResetPasswordSuccess) {
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
                        dispatch(clearUserResetPasswordError())
                        dispatch(closeModal())
                    }}>
                        <div className={`text text_type_main-default ${styles.retry} `}>
                            <span className="text text_type_main-medium">
                                {userResetPasswordError}
                            </span>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    dispatch(clearUserResetPasswordError())
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
