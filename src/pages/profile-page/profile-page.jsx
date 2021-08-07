import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    getUserLoadData,
    clearUserLoadError,
    getUserSaveData,
    clearUserSaveError,
    getUserLogout,
    clearUserLogoutError,
} from '../../services/actions/userActions';
import {
    openUserLoadModal,
    openUserSaveModal,
    openUserLogoutModal,
    closeModal,
} from '../../services/actions/modalActions';
import Modal from '../../components/modal/modal';
import styles from './profile-page.module.css';

const ProfilePage = () => {
    const {
        user,
        userLoadSuccess,
        userLoadError,
        userSaveSuccess,
        userSaveError,
        userLogoutSuccess,
        userLogoutError,
    } = useSelector(state => state.user);
    const [state, setState] = useState({
        name: user.name,
        email: user.email,
        password: '',
        showSubmit: false,
    });
    const { modalIsOpen, modalMode } = useSelector(state => state.modal);

    const onChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
            showSubmit: true,
        });
    };

    const declineHandler = () => {
        setState({
            name: user.name,
            email: user.email,
            password: '',
            showSubmit: false,
        });
    };

    const dispatch = useDispatch();
    const logoutHandler = useCallback(() => {
        dispatch(getUserLogout());
    }, [dispatch]);

    const saveHandler = useCallback(() => {
        dispatch(getUserSaveData({
            name: state.name,
            email: state.email,
            password: state.password,
        }));
    }, [dispatch, state.name, state.email, state.password]);

    useEffect(() => {
        if (userSaveSuccess) {
            setState(prevState => {
                return {
                    ...prevState,
                    name: user.name,
                    email: user.email,
                    showSubmit: false,
                };
            });
        }
    }, [userSaveSuccess, user.name, user.email]);

    useEffect(() => {
        dispatch(getUserLoadData());
    }, [dispatch]);

    useEffect(() => {
        if (userLoadSuccess) {
            setState(prevState => {
                return {
                    ...prevState,
                    name: user.name,
                    email: user.email,
                };
            });
        }
    }, [userLoadSuccess, user.name, user.email]);

    useEffect(() => {
        if (userLoadError) {
            dispatch(openUserLoadModal());
        }
    }, [userLoadError, dispatch]);

    useEffect(() => {
        if (userSaveError) {
            dispatch(openUserSaveModal());
        }
    }, [userSaveError, dispatch]);

    useEffect(() => {
        if (userLogoutError) {
            dispatch(openUserLogoutModal());
        }
    }, [userLogoutError, dispatch]);

    if (userLogoutSuccess) {
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
                        {
                            state.showSubmit ? (
                                <div className={styles.submit}>
                                    <Button
                                        type="secondary"
                                        size="medium"
                                        onClick={declineHandler}
                                    >
                                        Отмена
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="medium"
                                        onClick={saveHandler}
                                    >
                                        Сохранить
                                    </Button>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </main>
            {
                modalIsOpen && modalMode === 'user-load' ? (
                    <Modal onClose={() => {
                        dispatch(clearUserLoadError())
                        dispatch(closeModal())
                    }}>
                        <span className="text text_type_main-medium">
                            {userLoadError}
                        </span>
                    </Modal>
                ) : null
            }
            {
                modalIsOpen && modalMode === 'user-save' ? (
                    <Modal onClose={() => {
                        dispatch(clearUserSaveError())
                        dispatch(closeModal())
                    }}>
                        <span className="text text_type_main-medium">
                            {userSaveError}
                        </span>
                    </Modal>
                ) : null
            }
            {
                modalIsOpen && modalMode === 'logout' ? (
                    <Modal onClose={() => {
                        dispatch(clearUserLogoutError())
                        dispatch(closeModal())
                    }}>
                        <span className="text text_type_main-medium">
                            {userLogoutError}
                        </span>
                    </Modal>
                ) : null
            }
        </>
    );
};

export default ProfilePage;
