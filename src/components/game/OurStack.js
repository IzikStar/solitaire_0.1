// מחלקת Stack שמייצגת סטאק עם מערך קלפים ומספר קלפים פתוחים
export class OurStack {
    constructor(cards = [], openCards = 0) {
        this.cards = cards;  // מערך של קלפים
        this.openCards = openCards;  // מספר קלפים פתוחים בסטאק
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

    // פונקציה לקבלת מערך הקלפים הפתוחים
    getOpenCards() {
        return this.cards.slice(-this.openCards);
    }
    getCloseCards() {
        return this.cards.slice(0, this.openCards);
    }
}