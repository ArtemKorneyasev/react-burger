import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserLogin, clearUserLoginError } from '../../services/redux/actions/userActions';
import { openUserLoginModal, closeModal } from '../../services/redux/actions/modalActions';
import { isUserAuth } from '../../services/helpers';
import Modal from '../../components/modal/modal';
import styles from './login-page.module.css';

const LoginPage = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const { userLoginSuccess, userLoginError } = useSelector(state => state.user);
    const { modalIsOpen, modalMode } = useSelector(state => state.modal);
    const isAuth = isUserAuth();

    const onChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const dispatch = useDispatch();
    const loginHandler = useCallback((event) => {
        event.preventDefault();
        dispatch(getUserLogin(state));
    }, [state, dispatch]);

    useEffect(() => {
        if (userLoginError) {
            dispatch(openUserLoginModal());
        }
    }, [dispatch, userLoginError]);

    if (userLoginSuccess || isAuth) {
        return (
            <Redirect to={{ pathname: '/' }} />
        );
    }

    return (
        <>
            <div className={styles.root}>
                <span className="text text_type_main-medium">
                    Вход
                </span>
                <form
                    className={styles.form}
                    onSubmit={loginHandler}
                >
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
                        <Button type="primary" size="medium">
                            Войти
                        </Button>
                    </div>
                </form>
                <div
                    className={
                        `text text_type_main-default text_color_inactive ${styles.linksWrapper}`
                    }
                >
                    <div className={styles.linkContainer}>
                        <span>Вы — новый пользователь?</span>
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
                        dispatch(clearUserLoginError());
                        dispatch(closeModal());
                    }}>
                        <span className="text text_type_main-medium">
                            {userLoginError}
                        </span>
                    </Modal>
                ) : null
            }
        </>
    );
};

export default LoginPage;
