export const moveInArray = (arr, from, to) => {
    const item = arr[from];
    const newArr = [...arr];
    newArr.splice(from, 1);
    newArr.splice(to, 0, item);

    return newArr;
};
