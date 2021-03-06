import { FC, useState, useCallback, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/redux/hooks';
import { NavLink, Redirect, Switch, Route } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    getUserLoadData,
    clearUserLoadError,
    getUserSaveData,
    clearUserSaveError,
    getUserLogout,
    clearUserLogoutError,
} from '../../services/redux/actions/userActions';
import {
    openUserLoadModal,
    openUserSaveModal,
    openUserLogoutModal,
    closeModal,
} from '../../services/redux/actions/modalActions';
import OrdersList from '../../components/orders-list/orders-list';
import Modal from '../../components/modal/modal';
import styles from './profile-page.module.css';

interface IState {
    name: string;
    email: string;
    password: string;
    showSubmit: boolean;
}

const ProfilePage: FC = () => {
    const {
        user,
        userLoadSuccess,
        userLoadError,
        userSaveSuccess,
        userSaveError,
        userLogoutSuccess,
        userLogoutError,
    } = useSelector(state => state.user);
    const [state, setState] = useState<IState>({
        name: user.name,
        email: user.email,
        password: '',
        showSubmit: false,
    });
    const { modalIsOpen, modalMode } = useSelector(state => state.modal);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    const saveHandler = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
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
    }, [dispatch, userLoadSuccess, user.name, user.email]);

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
                            exact
                            to="/profile"
                            className={`${styles.link} text_color_inactive`}
                            activeClassName={styles.activeTab}
                        >
                            ??????????????
                        </NavLink>
                        <NavLink
                            to="/profile/orders"
                            className={`${styles.link} text_color_inactive`}
                            activeClassName={styles.activeTab}
                        >
                            ?????????????? ??????????????
                        </NavLink>
                        <button
                            className={
                                `text text_type_main-medium text_color_inactive ${styles.logoutBtn}`
                            }
                            onClick={logoutHandler}
                        >
                            ??????????
                        </button>
                        <span
                            className={
                                `text text_type_main-small text_color_inactive ${styles.note}`
                            }
                        >
                            ?? ???????? ?????????????? ???? ???????????? <br/> ???????????????? ???????? ???????????????????????? ????????????
                        </span>
                    </div>
                    <Switch>
                        <Route exact path="/profile">
                            <form className={styles.form} onSubmit={saveHandler}>
                                <div className={styles.input}>
                                    <Input
                                        placeholder="??????"
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
                                                ????????????
                                            </Button>
                                            <Button type="primary" size="medium">
                                                ??????????????????
                                            </Button>
                                        </div>
                                    ) : null
                                }
                            </form>
                        </Route>
                        <Route path="/profile/orders">
                            <OrdersList mode="profile" />
                        </Route>
                    </Switch>
                </div>
            </main>
            {
                modalIsOpen && modalMode === 'user-load' ? (
                    <Modal onClose={() => {
                        dispatch(clearUserLoadError());
                        dispatch(closeModal());
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
                        dispatch(clearUserSaveError());
                        dispatch(closeModal());
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
                        dispatch(clearUserLogoutError());
                        dispatch(closeModal());
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
