import { OurStack } from "./OurStack";

// מחלקת GameState שמייצגת את מצב הלוח
export class GameState {
    constructor(stacks, piles, jackpotStack = new OurStack(), numOfMove = 0) {
        this.stacks = stacks;  // מערך של 7 סטאקים
        this.jackpotStack = jackpotStack;  // סטאק ג'קפוט
        this.piles = piles;  // מערך של 4 ערימות (מערכים)
        this.numOfMove = numOfMove;  // מספר מהלכים שהתבצעו
    }
    getNumOfMove() {
        return this.numOfMove;
    }
    getStacks() {
        return this.stacks;
    }
    getJackpot() {
        return this.jackpotStack;
    }
    getJackpotStack() {
        return this.jackpotStack;
    }
    getPiles() {
        return this.piles;
    }

    getIsWinning() {
        for (let index = 0; index < this.piles.length - 3; index++) {
            if (this.piles[index].length < 1 ) {
                return false;
            }
        }
        return true;
    }

    toString() {
        return `\nStacks:\n${this.stacks !== undefined ? this.stacks : 'undefined'}, 
        \nPiles:\n${this.piles !== undefined ? this.piles : 'undefined'},
        \nJackpot:\n${this.jackpotStack ? this.jackpotStack.toString() : 'undefined'},
        \nMove:\n${this.numOfMove !== undefined ? this.numOfMove : 'undefined'}`;
    }
}