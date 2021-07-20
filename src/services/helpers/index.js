export const moveInArray = (arr, from, to) => {
    const item = arr.splice(from, 1);
    arr.splice(to, 0, item[0]);

    return arr;
};
