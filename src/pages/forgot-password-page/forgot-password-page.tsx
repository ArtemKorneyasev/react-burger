import { FC, useState, useCallback, useEffect, SyntheticEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../../services/redux/hooks';
import { Link, useHistory } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
    getUserForgotPassword,
    clearUserForgotPasswordError,
} from '../../services/redux/actions/userActions';
import {
    openUserForgotPasswordModal,
    closeModal,
} from '../../services/redux/actions/modalActions';
import { isUserAuth } from '../../services/helpers';
import Modal from '../../components/modal/modal';
import styles from './forgot-password-page.module.css';

const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState<string>('');
    const {
        userForgotPasswordSuccess,
        userForgotPasswordError,
    } = useSelector(state => state.user);
    const { modalIsOpen, modalMode } = useSelector(state => state.modal);
    const isAuth = isUserAuth();

    const onChangeEmail = (
        event: ChangeEvent<HTMLInputElement>,
    ) => setEmail(event.target.value);

    const dispatch = useDispatch();
    const history = useHistory();

    const forgotPasswordHandler = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(getUserForgotPassword(email));
    }, [email, dispatch]);

    useEffect(() => {
        if (userForgotPasswordError) {
            dispatch(openUserForgotPasswordModal());
        }
    }, [dispatch, userForgotPasswordError]);

    if (userForgotPasswordSuccess) {
        history.replace({ pathname: '/reset-password' });
    }

    if (isAuth) {
        history.replace({ pathname: '/' });
    }

    return (
        <>
            <div className={styles.root}>
                <span className="text text_type_main-medium">
                    Восстановление пароля
                </span>
                <form
                    className={styles.form}
                    onSubmit={forgotPasswordHandler}
                >
                    <div className={styles.input}>
                        <EmailInput
                            onChange={onChangeEmail}
                            value={email}
                            name="email"
                        />
                    </div>
                    <div className={styles.btn}>
                        <Button type="primary" size="medium">
                            Восстановить
                        </Button>
                    </div>
                </form>
                <div
                    className={
                        `text text_type_main-default text_color_inactive ${styles.linkContainer}`
                    }
                >
                    <span>Вспомнили пароль?</span>
                    <Link className={styles.link} to="/login">
                        Войти
                    </Link>
                </div>
            </div>
            {
                modalIsOpen && modalMode === 'forgot-password' ? (
                    <Modal onClose={() => {
                        dispatch(clearUserForgotPasswordError());
                        dispatch(closeModal());
                    }}>
                        <span className="text text_type_main-medium">
                            {userForgotPasswordError}
                        </span>
                    </Modal>
                ) : null
            }
        </>
    );
};

export default ForgotPasswordPage;
