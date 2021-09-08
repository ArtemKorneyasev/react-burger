import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found-404.module.css';

const NotFound404: FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.notFountContainer}>
                <span className="text text_type_digits-large">
                    404
                </span>
                <span className="text text_type_main-large">
                    страница не найдена
                </span>
            </div>
            <div className={`text text_type_main-default ${styles.linkContainer}`}>
                <Link to='/' className={styles.link}>
                    Перейти в конструктор бургеров
                </Link>
            </div>
        </div>
    );
};

export default NotFound404;
