import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserRegister, clearRegisterError } from '../../services/actions/userActions';
import { openRegisterModal, closeModal } from '../../services/actions/modalActions';
import Modal from '../../components/modal/modal';
import styles from './register-page.module.css';

const RegisterPage = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { registerSuccess, registerError } = useSelector(state => state.user);
    const { modalIsOpen, modalMode } = useSelector(state => state.modal);

    const onChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const dispatch = useDispatch();
    const registerHandler = useCallback(() => {
        dispatch(getUserRegister(state));
    }, [state, dispatch]);

    useEffect(() => {
        if (registerError) {
            dispatch(openRegisterModal());
        }
    }, [registerError, dispatch]);

    if (registerSuccess) {
        return (
            <Redirect to={{ pathname: '/' }} />
        );
    }

    return (
        <>
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
                        onClick={registerHandler}
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
            {
                modalIsOpen && modalMode === 'register' ? (
                    <Modal onClose={() => {
                        dispatch(clearRegisterError());
                        dispatch(closeModal())
                    }}>
                        <span className="text text_type_main-medium">
                            {registerError}
                        </span>
                    </Modal>
                ) : null
            }
        </>
    );
};

export default RegisterPage;
