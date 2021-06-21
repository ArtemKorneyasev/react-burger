import React from 'react';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class AppHeader extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <nav className={`${styles.headerContent} pt-4 pb-4`}>
                    <div className={styles.itemsWrapper}>
                        <div className={`${styles.menuItem} mr-2 pl-5 pt-4 pr-5 pb-4`}>
                            <BurgerIcon type="primary" />
                            <small className="text text_type_main-default ml-2">
                                Конструктор
                            </small>
                        </div>
                        <div className={`${styles.menuItem} pl-5 pt-4 pr-5 pb-4`}>
                            <ListIcon type="secondary" />
                            <small className="text text_type_main-default text_color_inactive ml-2">
                                Лента заказов
                            </small>
                        </div>
                    </div>
                    <div className={styles.logoItem}>
                        <Logo />
                    </div>
                    <div className={`${styles.menuItem} pl-5 pt-4 pr-5 pb-4`}>
                        <ProfileIcon type="secondary" />
                        <small className="text text_type_main-default text_color_inactive ml-2">
                            Личный кабинет
                        </small>
                    </div>
                </nav>
            </header>
        );
    }
}

export default AppHeader;
