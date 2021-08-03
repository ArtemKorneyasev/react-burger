import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserForgotPassword } from '../../services/actions/userActions';
import styles from './forgot-password-page.module.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const { forgotPasswordResult } = useSelector(state => state.user);

    const onChangeEmail = event => setEmail(event.target.value);

    const dispatch = useDispatch();
    const forgotPasswordHandler = useCallback(() => {
        dispatch(getUserForgotPassword(email));
    }, [email, dispatch]);

    // @TODO(2021-08-03 - add error handling)

    if (forgotPasswordResult.success) {
        return (
            <Redirect to={{ pathname: '/reset-password' }} />
        );
    }

    return (
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
                <Button type="primary" size="medium" onClick={forgotPasswordHandler}>
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
    );
};

export default ForgotPasswordPage;
