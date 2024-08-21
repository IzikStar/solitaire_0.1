// מחלקת Stack שמייצגת סטאק עם מערך קלפים ומספר קלפים פתוחים
export class OurStack {
    constructor(cards = [], openCards = 0) {
        this.cards = cards;  // מערך של קלפים
        this.openCards = openCards;  // מספר קלפים פתוחים בסטאק
    }

    getCards() {
        return this.cards;
    }

    getNumOfOpenCards() {
        return this.openCards;
    }

    getNumOfCloseCards() {
        return this.cards.length - this.openCards;
    }

    // פונקציה להוספת קלף לסטאק
    addCard(card) {
        this.cards.push(card);
    }

    // פונקציה להסרת קלף מהסטאק
    removeCard() {
        return this.cards.pop();
    }

    // פונקציה לקבלת מספר הקלפים בסטאק
    getNumCards() {
        return this.cards.length;
    }

    getNumOfCards() {
        return this.cards.length;
    }

    // פונקציה לקבלת מערך הקלפים הפתוחים
    getOpenCards() {
        return this.cards.slice(this.cards.length - this.openCards, this.cards.length);
    }
    getCloseCards() {
        return this.cards.slice(0, this.cards.length - this.openCards);
    }
    getNewOurStackFromArray(cards) {
        let numOfOpenCards;
        if (cards.length > this.cards.length){
            numOfOpenCards = this.openCards + (cards.length - this.cards.length);
        }
        else{
            numOfOpenCards = 1;
        }
        return new OurStack(cards, numOfOpenCards);
    }

    getNewOurJackpotFromArray(array) {
        return new OurStack(array, this.openCards - 1);
    }

    toString() {
        return `\nCards:\n${this.cards !== undefined ? this.cards.map((card, i) => `${i}: ${card ? card.code : 'undefined'}`).join("\n") : 'undefined'}, 
        \nOpen Cards:\n${this.openCards !== undefined ? this.openCards : 'undefined'}`;
    }
}