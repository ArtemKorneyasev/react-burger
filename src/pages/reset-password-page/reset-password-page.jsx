import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserResetPassword } from '../../services/actions/userActions';
import styles from './reset-password-page.module.css';

const ResetPasswordPage = () => {
    const [state, setState] = useState({
        password: '',
        token: '',
    });
    const {
        resetPasswordResult,
        resetPasswodError,
    } = useSelector(state => state.user);

    const onChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const dispatch = useDispatch();
    const resetPasswordHandler = useCallback(() => {
        const { password, token } = state;
        dispatch(getUserResetPassword({ password, token }));
    }, [state, dispatch]);

    if (resetPasswordResult.success) {
        return (
            <Redirect to={{ pathname: '/login' }} />
        );
    }

    if (resetPasswodError) {
        return (
            <Redirect to={{ pathname: '/forgot-password' }} />
        );
    }

    return (
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
                <Button type="primary" size="medium" onClick={resetPasswordHandler}>
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
    );
};

export default ResetPasswordPage;
