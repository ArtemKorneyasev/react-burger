import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => (
    <header className={styles.header}>
        <nav className={`${styles.headerContent} pt-4 pb-4`}>
            <div className={styles.itemsWrapper}>
                <div className={`${styles.menuItem} mr-2 pl-5 pt-4 pr-5 pb-4`}>
                    <BurgerIcon type="primary" />
                    <span className="text text_type_main-default ml-2">
                        Конструктор
                    </span>
                </div>
                <div className={`${styles.menuItem} pl-5 pt-4 pr-5 pb-4`}>
                    <ListIcon type="secondary" />
                    <span className="text text_type_main-default text_color_inactive ml-2">
                        Лента заказов
                    </span>
                </div>
            </div>
            <div className={styles.logoItem}>
                <Logo />
            </div>
            <div className={`${styles.menuItem} pl-5 pt-4 pr-5 pb-4`}>
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive ml-2">
                    Личный кабинет
                </span>
            </div>
        </nav>
    </header>
);

export default AppHeader;
