import { NavLink, useHistory } from 'react-router-dom';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    const history = useHistory();

    return (
        <header className={styles.header}>
            <nav className={`${styles.headerContent} pt-4 pb-4`}>
                <div className={styles.itemsWrapper}>
                    <NavLink
                        exact
                        to="/"
                        className={`${styles.link} mr-2 pl-5 pt-4 pr-5 pb-4 text_color_inactive`}
                        activeClassName={styles.activeTab}
                    >
                        <BurgerIcon type="secondary" />
                        <span className="text text_type_main-default ml-2">
                            Конструктор
                        </span>
                    </NavLink>
                    <NavLink
                        to="/feed"
                        className={`${styles.link} pl-5 pt-4 pr-5 pb-4 text_color_inactive`}
                        activeClassName={styles.activeTab}
                    >
                        <ListIcon type="secondary" />
                        <span className="text text_type_main-default ml-2">
                            Лента заказов
                        </span>
                    </NavLink>
                </div>
                <div
                    className={styles.logoItem}
                    onClick={() => history.replace({ pathname: '/' })}
                >
                    <Logo />
                </div>
                <NavLink
                    to="/profile"
                    className={`${styles.link} pl-5 pt-4 pr-5 pb-4 text_color_inactive`}
                    activeClassName={styles.activeTab}
                >
                    <ProfileIcon type="secondary" />
                    <span className="text text_type_main-default ml-2">
                        Личный кабинет
                    </span>
                </NavLink>
            </nav>
        </header>
    );
};

export default AppHeader;
