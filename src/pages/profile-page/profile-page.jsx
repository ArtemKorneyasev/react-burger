import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile-page.module.css';

const ProfilePage = () => {
    const { user } = useSelector(state => state.user);

    return (
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
                    <NavLink
                        to="/login"
                        className={`${styles.link} text_color_inactive`}
                        activeClassName={styles.activeTab}
                        style={{ marginBottom: 80 }}
                    >
                        Выход
                    </NavLink>
                    <span className={`text text_type_main-small text_color_inactive ${styles.note}`}>
                        В этом разделе вы можете <br/> изменить свои персональные данные
                    </span>
                </div>
                <div className={styles.form}>
                    <div className={styles.input}>
                        <Input
                            placeholder="Имя"
                            // onChange={onChange}
                            value={user.name}
                            name="name"
                        />
                    </div>
                    <div className={styles.input}>
                        <EmailInput
                            // onChange={onChange}
                            value={user.email}
                            name="email"
                        />
                    </div>
                    <div className={styles.input}>
                        <PasswordInput
                            // onChange={onChange}
                            value={''}
                            name="password"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
