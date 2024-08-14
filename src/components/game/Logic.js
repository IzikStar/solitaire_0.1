

export const isValidMove = (selectedCard, toCard, isToStacks) => {
    if (isToStacks) {
        return isValidToStacksMove(selectedCard, toCard);
    } else {
        return isValidToPilesMove(selectedCard, toCard);
    }
}

export const isValidToPilesMove = (selectedCard, toCard) => {
    if (toCard === 0) return selectedCard[0] === 'A';
    return selectedCard[1] === toCard[1] && getValue(selectedCard[0]) === getValue(toCard[0]) + 1;
}

export const isValidToStacksMove = (selectedCard, toCard) => {
    if (toCard === 0) return selectedCard[0] === 'K';
    const isBlack = getIsblack(selectedCard[1]);
    const isBlackTo = getIsblack(toCard[1]);
    return isBlack !== isBlackTo && getValue(selectedCard[0]) + 1 === getValue(toCard[0]);
}

export const getAllIndexes = (arr, val) => {
    const indexes = [];
    arr.forEach((elem, index) => {
        if (elem === val) {
            indexes.push(index);
        }
    });
    return indexes;
};

export const getRandomIndex = (arr, val) => {
    const indexes = getAllIndexes(arr, val);
    if (indexes.length === 0) {
        return -1; // Return -1 if the value is not found in the array
    }
    const randomIndex = Math.floor(Math.random() * indexes.length);
    return indexes[randomIndex];
};

const getIsblack = (suit) => {
    return suit === 'C' || suit === 'S';
}

const getValue = (letter) => {
    if (letter === 'A') return 1;
    if (letter === 'J') return 11;
    if (letter === 'Q') return 12;
    if (letter === 'K') return 13;
    if (letter === '0') return 10;
    return Number(letter);
}
