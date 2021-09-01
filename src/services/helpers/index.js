import 'moment/locale/ru';
import moment from 'moment-timezone';

export const moveInArray = (arr, from, to) => {
    const item = arr[from];
    const newArr = [...arr];
    newArr.splice(from, 1);
    newArr.splice(to, 0, item);

    return newArr;
};

export const getCookie = name => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, props) => {
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

export const deleteCookie = name => setCookie(name, null, { expires: -1 });
export const isUserAuth = () => getCookie('accessToken');
export const getFormattedDate = date => `${moment.tz(date, 'Europe/Moscow').calendar()} i-GMT+3`;

export const getOrderStatus = status => {
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

export const getTotalPrice = (ingredients, orderDetails) => {
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
