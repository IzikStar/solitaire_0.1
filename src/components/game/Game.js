export class Game {
    constructor(currnetState) {
        this.currentState = currnetState;
        this.history = new Array();
        this.history.push(this.currentState);
        this.index = 0;
    }
    addNewMove(state) {
        this.history.push(state);
        this.index++;
        this.currentState = state;
        this.history = this.history.slice(0, this.index);
    }
    getCurrentState() {
        return this.currentState;
    }
    undo() {
        if (this.index > 0) {
            this.index--;
            this.currentState = this.history[this.index];
        }
    }
    redo() {
        if (this.index < this.history.length) {
            this.index++;
            this.currentState = this.history[this.index];
        }
    }
    reset() {
        this.index = 0;
        this.currentState = this.history[this.index];
    }
}


export let game;