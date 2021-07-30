import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';

const LoginPage = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const onChangeEmail = event => {
        setState({
            ...state,
            email: event.target.value,
        });
    };

    const onChangePassword = event => {
        setState({
            ...state,
            password: event.target.value,
        });
    };

    return (
        <div className={styles.root}>
            <span className="text text_type_main-medium">
                Вход
            </span>
            <div className={styles.input}>
                <EmailInput
                    onChange={onChangeEmail}
                    value={state.email}
                    name={'email'}
                />
            </div>
            <div className={styles.input}>
                <PasswordInput
                    onChange={onChangePassword}
                    value={state.password}
                    name={'password'}
                />
            </div>
            <div className={styles.btn}>
                <Button type="primary" size="medium">
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
    );
};

export default LoginPage;
