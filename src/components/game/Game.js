import { GameState } from "./GameState";
import { OurStack } from "./OurStack";

const toLog = false;
export class Game {

    constructor(currentState, history = [currentState], index = 0) {
        this.currentState = currentState;
        this.history = history;
        this.index = index;
        // console.log(this.currentState);
    }

    addNewMove(state) {
        // יצירת היסטוריה חדשה עד לאינדקס הנוכחי
        let newHistory = this.history.slice(0, this.index + 1);
        newHistory.push(state);
        // יצירת מופע חדש של Game
        return new Game(state, newHistory, this.index + 1);
    }

    getCurrentState() {
        // החזרת מופע ה-Game הנוכחי
        return this.currentState;
    }

    undo() {
        if (this.index > 0) {
            // חזרה לאחור והחזרת מצב חדש
            return new Game(this.history[this.index - 1], this.history, this.index - 1);
        }
        // אם אין מצב קודם, החזרת מופע ה-Game הנוכחי
        return this;
    }

    redo() {
        if (this.index < this.history.length - 1) {
            // חזרה קדימה והחזרת מצב חדש
            return new Game(this.history[this.index + 1], this.history, this.index + 1);
        }
        // אם אין מצב קדמי, החזרת מופע ה-Game הנוכחי
        return this;
    }

    reset() {
        // החזרת מצב ההתחלה
        return new Game(this.history[0], this.history, 0);
    }

    addNewMoveFromJackpot() {
        let state = new GameState(
            this.currentState.getStacks(),
            this.currentState.getPiles(),
            new OurStack(
                this.currentState.getJackpot().getCards(),
                (this.currentState.getJackpot().getNumOfOpenCards() + 1) % (this.currentState.getJackpot().getNumOfCards() + 1)
            ),
            this.currentState.getNumOfMove());

        if (toLog) console.log("adding new move from jackpot");
        return this.addNewMove(state);
    }


    toString() {
        return `\nCurrent State:\n${this.currentState ? this.currentState.toString() : 'undefined'}
            \nHistory Length:\n${this.history ? this.history.length : 'undefined'}
            \nCurrent Index:\n${this.index !== undefined ? this.index : 'undefined'}
            \nHistory:\n
        ${this.history ? this.history.map((state, i) => `${i}: ${state ? state.toString() : 'undefined'}`).join("\n") : 'undefined'}`;
    }
}