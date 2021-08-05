import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserLogin, clearLoginError } from '../../services/actions/userActions';
import { openLoginModal, closeModal } from '../../services/actions/modalActions';
import Modal from '../../components/modal/modal';
import styles from './login-page.module.css';

const LoginPage = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const { loginSuccess, loginError } = useSelector(state => state.user);
    const { modalIsOpen, modalMode } = useSelector(state => state.user);

    const onChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const dispatch = useDispatch();
    const loginHandler = useCallback(() => {
        dispatch(getUserLogin(state));
    }, [state, dispatch]);

    useEffect(() => {
        if (loginError) {
            dispatch(openLoginModal());
        }
    }, [dispatch, loginError]);

    if (loginSuccess) {
        return (
            <Redirect tp={{ pathname: '/' }} />
        );
    }

    return (
        <>
            <div className={styles.root}>
                <span className="text text_type_main-medium">
                    Вход
                </span>
                <div className={styles.input}>
                    <EmailInput
                        onChange={onChange}
                        value={state.email}
                        name="email"
                    />
                </div>
                <div className={styles.input}>
                    <PasswordInput
                        onChange={onChange}
                        value={state.password}
                        name="password"
                    />
                </div>
                <div className={styles.btn}>
                    <Button
                        type="primary"
                        size="medium"
                        onClick={loginHandler}
                    >
                        Войти
                    </Button>
                </div>
                <div className={`text text_type_main-default text_color_inactive ${styles.linksWrapper}`}>
                    <div className={styles.linkContainer}>
                        <span>Вы — новый пользователь?</span>
                        <Link className={styles.link} to="/register">
                            Зарегистрироваться
                        </Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <span>Забыли пароль?</span>
                        <Link className={styles.link} to="/forgot-password">
                            Восстановить пароль
                        </Link>
                    </div>
                </div>
            </div>
            {
                modalIsOpen && modalMode === 'login' ? (
                    <Modal onClose={() => {
                        dispatch(clearLoginError())
                        dispatch(closeModal())
                    }}>
                        <span className="text text_type_main-medium">
                            {loginError}
                        </span>
                    </Modal>
                ) : null
            }
        </>
    );
};

export default LoginPage;
