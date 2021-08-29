import { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { showIngredientInfo } from '../../services/redux/actions/ingredientsActions';
import { openIngredientModal } from '../../services/redux/actions/modalActions';
import IngredientCard from '../ingredient-card/ingredient-card';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const [nearestTab, setNearestTab] = useState('buns');
    const { ingredients, ingredientsError } = useSelector(state => state.ingredients);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const scrollContainerRef = useRef(null);
    const bunsHeaderRef = useRef(null);
    const saucesHeaderRef = useRef(null);
    const mainsHeaderRef = useRef(null);

    const handleScroll = () => {
        const scrollContainerPosition = scrollContainerRef.current.getBoundingClientRect().top;

        const bunHeaderPosition = bunsHeaderRef.current.getBoundingClientRect().top;
        const sauceHeaderPosition = saucesHeaderRef.current.getBoundingClientRect().top;
        const mainHeaderPosition = mainsHeaderRef.current.getBoundingClientRect().top;

        const bunsDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
        const saucesDiff = Math.abs(scrollContainerPosition - sauceHeaderPosition);
        const mainsDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);

        if (bunsDiff < saucesDiff) {
            setNearestTab('buns');
        } else if (saucesDiff < mainsDiff) {
            setNearestTab('sauces');
        } else {
            setNearestTab('mains');
        }
    };

    const onIngredientCardClick = useCallback(data => {
        dispatch(showIngredientInfo(data));
        dispatch(openIngredientModal());
        history.push({
            pathname: `/ingredients/${data._id}`,
            state: { background: location} ,
        });
    }, [dispatch, history, location]);

    if (ingredientsError) {
        return (
            <section className={styles.section}>
                <h1 className={`text text_type_main-large ${styles.title}`}>
                    {ingredientsError}
                </h1>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <h1 className={`text text_type_main-large ${styles.title}`}>
                Соберите бургер
            </h1>
            <div className={styles.tabs}>
                <Tab value="buns" active={nearestTab === 'buns'} onClick={() => {}}>
                    Булки
                </Tab>
                <Tab value="sauces" active={nearestTab === 'sauces'} onClick={() => {}}>
                    Соусы
                </Tab>
                <Tab value="mains" active={nearestTab === 'mains'} onClick={() => {}}>
                    Начинки
                </Tab>
            </div>
            <div
                ref={scrollContainerRef}
                className={styles.ingredientsWrapper}
                onScroll={handleScroll}
            >
                <h3
                    ref={bunsHeaderRef}
                    className={`${styles.subtitle} text text_type_main-medium`}
                >
                    Булки
                </h3>
                <ul className={styles.ingredientsBlock}>
                    {
                        ingredients.filter(ingredient =>
                            ingredient.type === 'bun'
                        ).map(bunItem =>
                            <IngredientCard
                                key={bunItem._id}
                                data={bunItem}
                                onClick={onIngredientCardClick}
                            />
                        )
                    }
                </ul>
                <h3
                    ref={saucesHeaderRef}
                    className={`${styles.subtitle} text text_type_main-medium`}
                >
                    Соусы
                </h3>
                <ul className={styles.ingredientsBlock}>
                    {
                        ingredients.filter(ingredient =>
                            ingredient.type === 'sauce'
                        ).map(sauceItem =>
                            <IngredientCard
                                key={sauceItem._id}
                                data={sauceItem}
                                onClick={onIngredientCardClick}
                            />
                        )
                    }
                </ul>
                <h3
                    ref={mainsHeaderRef}
                    className={`${styles.subtitle} text text_type_main-medium`}
                >
                    Начинка
                </h3>
                <ul className={styles.ingredientsBlock}>
                    {
                        ingredients.filter(ingredient =>
                            ingredient.type === 'main'
                        ).map(mainItem =>
                            <IngredientCard
                                key={mainItem._id}
                                data={mainItem}
                                onClick={onIngredientCardClick}
                            />
                        )
                    }
                </ul>
            </div>
        </section>
    );
};

export default BurgerIngredients;
