// Move rules. Cards are deck-of-cards codes: rank char + suit char ("0H" is the ten of hearts).
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
