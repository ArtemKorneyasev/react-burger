import 'moment/locale/ru';
import moment from 'moment-timezone';
import { TIngredient, TIngredientData, TOrder } from '../types';

export const moveInArray = (
    arr: ReadonlyArray<TIngredientData>,
    from: number,
    to: number,
): ReadonlyArray<TIngredientData> => {
    const item = arr[from];
    const newArr = [...arr];
    newArr.splice(from, 1);
    newArr.splice(to, 0, item);

    return newArr;
};

export const getCookie = (name: string): string | undefined => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string, props?: any): void => {
    props = props || {};
    let exp = props.expires;

    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }

    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;

    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];

        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
};

export const deleteCookie = (name: string): void => setCookie(name, '', { expires: -1 });
export const isUserAuth = (): string | null => getCookie('accessToken') || null;
export const getFormattedDate = (
    date: string,
): string => `${moment.tz(date, 'Europe/Moscow').calendar()} i-GMT+3`;

type TOrderStatus = 'Создан' | 'Готовится' | 'Выполнен' | 'Статус неизвестен';
export const getOrderStatus = (status: string): TOrderStatus => {
    switch (status) {
        case 'created':
            return 'Создан';
        case 'pending':
            return 'Готовится';
        case 'done':
            return 'Выполнен';
        default:
            return 'Статус неизвестен';
    }
};

export const getTotalPrice = (
    ingredients: ReadonlyArray<TIngredient>,
    orderDetails: TOrder,
): number => {
    return ingredients.filter((ingredient) => {
        let found = false;
        if (orderDetails.ingredients) {
            found = orderDetails.ingredients.includes(ingredient._id);
        }
        return found;
    }).reduce((total, current) => {
        if (current.type === 'bun') {
            total += (current.price * 2);
        } else {
            total += current.price;
        }
        return total;
    }, 0);
};

export const findIngredient = (
    uniqueId: string,
    ingredients: ReadonlyArray<TIngredient>,
): TIngredient | null => {
    if (ingredients.length) {
        return ingredients.find(ingredient => ingredient._id === uniqueId) || null;
    }
    return null;
};
