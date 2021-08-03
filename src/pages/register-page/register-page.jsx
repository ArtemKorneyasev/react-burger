import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserRegister } from '../../services/actions/userActions';
import styles from './register-page.module.css';

const RegisterPage = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();

    const onChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = () => {
        const { name, email, password } = state;
        dispatch(getUserRegister({ name, email, password }));
    };

    return (
        <div className={styles.root}>
            <span className="text text_type_main-medium">
                Регистрация
            </span>
            <div className={styles.input}>
                <Input
                    placeholder="Имя"
                    onChange={onChange}
                    value={state.name}
                    name="name"
                />
            </div>
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
                    onClick={onSubmit}
                >
                    Зарегистрироваться
                </Button>
            </div>
            <div
                className={`text text_type_main-default text_color_inactive ${styles.linkContainer}`}
            >
                <span>Уже зарегистрированы?</span>
                <Link className={styles.link} to="/login">
                    Войти
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
