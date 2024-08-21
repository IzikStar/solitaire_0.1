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

    toString() {
        return `Stacks: ${this.stacks !== undefined ? this.stacks : 'undefined'}, 
        Piles: ${this.piles !== undefined ? this.piles : 'undefined'},
        Jackpot: ${this.jackpotStack ? this.jackpotStack.toString() : 'undefined'},
        Move: ${this.numOfMove !== undefined ? this.numOfMove : 'undefined'}`;
    }
}