export const slice = (arr, num) => {
    const start = (num - 1) * 3;
    return arr.slice(start, start + 3);
}