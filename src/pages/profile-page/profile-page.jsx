import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserLogout, clearLogoutError } from '../../services/actions/userActions';
import { openLogoutModal, closeModal } from '../../services/actions/modalActions';
import Modal from '../../components/modal/modal';
import styles from './profile-page.module.css';

const ProfilePage = () => {
    const { user, logoutSuccess, logoutError } = useSelector(state => state.user);
    const [state, setState] = useState({
        name: user.name,
        email: user.email,
        password: '',
    });
    const { modalIsOpen, modalMode } = useSelector(state => state.modal);

    const onChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const dispatch = useDispatch();
    const logoutHandler = useCallback(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        dispatch(getUserLogout(refreshToken));
    }, [dispatch]);

    useEffect(() => {
        if (logoutError) {
            dispatch(openLogoutModal());
        }
    }, [logoutError, dispatch]);

    if (logoutSuccess) {
        return (
            <Redirect to={{ pathname: '/login' }} />
        );
    }

    return (
        <>
            <main className={styles.rootWrapper}>
                <div className={styles.root}>
                    <div className={`text text_type_main-medium ${styles.tabs}`}>
                        <NavLink
                            to="/profile"
                            className={`${styles.link} text_color_inactive`}
                            activeClassName={styles.activeTab}
                        >
                            Профиль
                        </NavLink>
                        <NavLink
                            to="/feed"
                            className={`${styles.link} text_color_inactive`}
                            activeClassName={styles.activeTab}
                        >
                            История заказов
                        </NavLink>
                        <button
                            className={`text text_type_main-medium text_color_inactive ${styles.logoutBtn}`}
                            onClick={logoutHandler}
                        >
                            Выход
                        </button>
                        <span className={`text text_type_main-small text_color_inactive ${styles.note}`}>
                            В этом разделе вы можете <br/> изменить свои персональные данные
                        </span>
                    </div>
                    <div className={styles.form}>
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
                    </div>
                </div>
            </main>
            {
                modalIsOpen && modalMode === 'logout' ? (
                    <Modal onClose={() => {
                        dispatch(clearLogoutError())
                        dispatch(closeModal())
                    }}>
                        <span className="text text_type_main-medium">
                            {logoutError}
                        </span>
                    </Modal>
                ) : null
            }
        </>
    );
};

export default ProfilePage;
