import React, { useState, useEffect, useContext } from 'react';
import './Game.css';
import { solitaire, jackpotNumOfCards } from './Solitaire.js';
import Jackpot from './Jackpot.jsx';
import { GameContext } from '../../App.jsx';
import GameStack from './GameStack.jsx';
import { isValidToStacksMove, isValidToPilesMove, getRandomIndex } from './Logic.js';
import FinalStack from './FinalStack.jsx';
import { OurStack } from './OurStack.js';
import { Game } from './Game.js';
import { GameState } from './GameState.js';

const Solitaire = () => {
  const toLog = false;  // הגדרת המשתנה בתחילת הפונקציה

  const [deckId, setDeckId] = useState(null);

  const { deck, setDeck, selectedCard, numOfClicks, numOfNewGame, setNumOfNewGame, currentGame, setCurrentGame, numOfRestarts, setIsWinning } = useContext(GameContext);

  const [numOfTurns, setNumOfTurns] = useState(0);

  const [stack1, setStack1] = useState(new OurStack());
  const [stack2, setStack2] = useState(new OurStack());
  const [stack3, setStack3] = useState(new OurStack());
  const [stack4, setStack4] = useState(new OurStack());
  const [stack5, setStack5] = useState(new OurStack());
  const [stack6, setStack6] = useState(new OurStack());
  const [stack7, setStack7] = useState(new OurStack());

  const [pile1, setPile1] = useState([]);
  const [pile2, setPile2] = useState([]);
  const [pile3, setPile3] = useState([]);
  const [pile4, setPile4] = useState([]);

  const [JackpotOurStack, setJackpotOurStack] = useState(new OurStack());

  const stacksArray = [stack1, stack2, stack3, stack4, stack5, stack6, stack7]
  const pileArray = [pile1, pile2, pile3, pile4];


  let nonStateStacksArray;
  let nonStatePileArray;
  let nonStateJackpot;
  let allreadyInitialized;

  if (allreadyInitialized === undefined) {
    console.log("initializing");
    nonStateStacksArray = [new OurStack(), new OurStack(), new OurStack(), new OurStack(), new OurStack(), new OurStack(), new OurStack];
    nonStatePileArray = [[], [], [], []];
    nonStateJackpot = new OurStack();
    allreadyInitialized = true;
  }

  useEffect(() => {
    setStack1(new OurStack());
    setStack2(new OurStack());
    setStack3(new OurStack());
    setStack4(new OurStack());
    setStack5(new OurStack());
    setStack6(new OurStack());
    setStack7(new OurStack());
    setPile1([]);
    setPile2([]);
    setPile3([]);
    setPile4([]);
    setJackpotOurStack(new OurStack());
    fetchDeck();
  }, [numOfNewGame]);

  useEffect(() => {
    if (numOfRestarts > 0) {
      setCurrentGame(currentGame.reset());
    }
  }, [numOfRestarts]);

  useEffect(() => {
    if (deckId) {
      drawDeck(deckId);
    }
  }, [deckId]);

  // השפעות על שינוי ב- selectedCard
  useEffect(() => {
    if (selectedCard !== null) {
      if (toLog) console.log("selectedCard:", selectedCard);  // הדפסה לבדיקת ה- selectedCard
      const card = deck.filter(c => c.code === selectedCard)[0];
      if (toLog) console.log("card from deck:", card);  // הדפסה לבדיקת הקלף שנבחר מהחפיסה

      // אתחול משתנים
      let validMove = false;
      const fromStack = new Array(7);
      const fromPile = new Array(4);
      let fromJackpot = false;
      const toStack = new Array(7);
      const toPile = new Array(4);

      let selectedCards = [];

      // בדיקה באיזה סטק הקלף שנבחר נמצא
      for (let i = 0; i < stacksArray.length; i++) {
        if (stacksArray[i].getNumCards() > 0) {
          for (let j = 0; j < stacksArray[i].getNumCards(); j++) {
            if (stacksArray[i].getCards()[j].code === selectedCard) {
              fromStack[i] = true;
              break;
            } else fromStack[i] = false;
          }
          if (fromStack[i] === true) {
            selectedCards = stacksArray[i].getCards().filter(c => stacksArray[i].getCards().indexOf(c) <= stacksArray[i].getCards().indexOf(card));
            break;
          }
        }
      }
      if (toLog) console.log("fromStack:", fromStack);  // הדפסה לבדיקת fromStack
      if (toLog) console.log("selectedCards from stack:", selectedCards);  // הדפסה לבדיקת הקלפים שנבחרו מהסטקים

      // בדיקה באיזה פייל הקלף שנבחר נמצא
      for (let i = 0; i < pileArray.length; i++) {
        fromPile[i] = false;
        if (pileArray[i].length > 0) {
          if (toLog) console.log(`pileArray[${i}].length > 0`);
          for (let j = pileArray[i].length - 1; j < pileArray[i].length; j++) {
            if (toLog) console.log('j = ' + j);
            if (pileArray[i][j].code === selectedCard) {
              fromPile[i] = true;
              break;
            }
          }
          if (fromPile[i] === true) {
            selectedCards = [pileArray[i][pileArray[i].length - 1]];
          }
        }
      }
      if (toLog) console.log("fromPile:", fromPile);  // הדפסה לבדיקת fromPile
      if (toLog) console.log("selectedCards from pile:", selectedCards);  // הדפסה לבדיקת הקלפים שנבחרו מהפיילים

      // בדיקה האם הקלף שנבחר הוא מ- jackpot
      for (let i = 0; i < JackpotOurStack.getCards().length; i++) {
        if (JackpotOurStack.getCards()[i].code === selectedCard) {
          fromJackpot = true;
          selectedCards = [JackpotOurStack.getCards()[i]];
          break;
        }
      }
      if (toLog) console.log("fromJackpot:", fromJackpot);  // הדפסה לבדיקת האם הקלף נלקח מה- jackpot
      if (toLog) console.log("selected card fromJackpot:", selectedCards[0]);

      // בדיקה האם הקלף שנבחר תקף להעברה לסטק כלשהו
      for (let i = 0; i < stacksArray.length; i++) {
        if (stacksArray[i].getNumCards() > 0) {
          if (isValidToStacksMove(selectedCard, stacksArray[i].getCards()[0].code))
            toStack[i] = true;
          else
            toStack[i] = false;
        } else
          toStack[i] = isValidToStacksMove(selectedCard, 0);
      }
      if (toLog) console.log("toStack:", toStack);  // הדפסה לבדיקת הסטקים שאפשר להעביר אליהם

      // בדיקה האם הקלף שנבחר תקף להעברה לפייל כלשהו
      for (let i = 0; i < pileArray.length; i++) {
        if (pileArray[i].length > 0) {
          if ((fromStack.indexOf(true) === -1 || stacksArray[fromStack.indexOf(true)].getCards()[0].code === selectedCard) && isValidToPilesMove(selectedCard, pileArray[i][pileArray[i].length - 1].code))
            toPile[i] = true;
          else
            toPile[i] = false;
        } else
          toPile[i] = isValidToPilesMove(selectedCard, 0);
      }
      if (toLog) console.log("toPile:", toPile);  // הדפסה לבדיקת הפיילים שאפשר להעביר אליהם


      // תנועות לקלפים בתוך הפייל
      switch (getRandomIndex(toPile, true)) {
        case 0:
          validMove = true;
          setPile1(prevPile => [...prevPile, selectedCards[0]]);
          nonStatePileArray[0].push(selectedCards[0]);
          break;
        case 1:
          validMove = true;
          setPile2(prevPile => [...prevPile, selectedCards[0]]);
          nonStatePileArray[1].push(selectedCards[0]);
          break;
        case 2:
          validMove = true;
          setPile3(prevPile => [...prevPile, selectedCards[0]]);
          nonStatePileArray[2].push(selectedCards[0]);
          break;
        case 3:
          validMove = true;
          setPile4(prevPile => [...prevPile, selectedCards[0]]);
          nonStatePileArray[3].push(selectedCards[0]);
          break;
        default:
          break;
      }

      // תנועות לקלפים בתוך הסטק
      if (toPile.indexOf(true) === -1) {
        switch (getRandomIndex(toStack, true)) {
          case 0:
            validMove = true;
            setStack1(stack1.getNewOurStackFromArray([...selectedCards, ...stack1.getCards()]));
            nonStateStacksArray[0] = nonStateStacksArray[0].getNewOurStackFromArray([[...selectedCards, ...nonStateStacksArray[0].getCards()]])
            break;
          case 1:
            validMove = true;
            setStack2(stack2.getNewOurStackFromArray([...selectedCards, ...stack2.getCards()]));
            nonStateStacksArray[1] = nonStateStacksArray[1].getNewOurStackFromArray([[...selectedCards, ...nonStateStacksArray[1].getCards()]])
            break;
          case 2:
            validMove = true;
            setStack3(stack3.getNewOurStackFromArray([...selectedCards, ...stack3.getCards()]));
            nonStateStacksArray[2] = nonStateStacksArray[2].getNewOurStackFromArray([[...selectedCards, ...nonStateStacksArray[2].getCards()]])
            break;
          case 3:
            validMove = true;
            setStack4(stack4.getNewOurStackFromArray([...selectedCards, ...stack4.getCards()])); nonStateStacksArray[3] = nonStateStacksArray[3].getNewOurStackFromArray([[...selectedCards, ...nonStateStacksArray[3].getCards()]])
            break;
          case 4:
            validMove = true;
            setStack5(stack5.getNewOurStackFromArray([...selectedCards, ...stack5.getCards()]));
            nonStateStacksArray[4] = nonStateStacksArray[4].getNewOurStackFromArray([[...selectedCards, ...nonStateStacksArray[4].getCards()]])
            break;
          case 5:
            validMove = true;
            setStack6(stack6.getNewOurStackFromArray([...selectedCards, ...stack6.getCards()]));
            nonStateStacksArray[5] = nonStateStacksArray[5].getNewOurStackFromArray([[...selectedCards, ...nonStateStacksArray[5].getCards()]])
            break;
          case 6:
            validMove = true;
            setStack7(stack7.getNewOurStackFromArray([...selectedCards, ...stack7.getCards()]));
            nonStateStacksArray[6] = nonStateStacksArray[6].getNewOurStackFromArray([[...selectedCards, ...nonStateStacksArray[6].getCards()]])
            break;
          default:
            if (toPile.indexOf(true) === -1) {
              if (toLog) console.log('No valid move');
              return;
            }
        }
      }
      if (toLog) console.log("Updated stacks and piles after move");  // הדפסה לבדיקת מצב הסטקים והפיילים לאחר תנועה

      // ניקוי הקלפים מהסטק או פייל לאחר תנועה
      switch (fromStack.indexOf(true)) {
        case 0:
          setStack1(stack1.getNewOurStackFromArray(stack1.getCards().filter(c => stack1.getCards().indexOf(c) > stack1.getCards().indexOf(card))));

          nonStateStacksArray[0] = nonStateStacksArray[0].getNewOurStackFromArray(nonStateStacksArray[0].getCards().filter(c => nonStateStacksArray[0].getCards().indexOf(c) > nonStateStacksArray[0].getCards().indexOf(card)))
          break;
        case 1:
          setStack2(stack2.getNewOurStackFromArray(stack2.getCards().filter(c => stack2.getCards().indexOf(c) > stack2.getCards().indexOf(card))));
          nonStateStacksArray[1] = nonStateStacksArray[1].getNewOurStackFromArray(nonStateStacksArray[1].getCards().filter(c => nonStateStacksArray[1].getCards().indexOf(c) > nonStateStacksArray[1].getCards().indexOf(card)))
          break;
        case 2:
          setStack3(stack3.getNewOurStackFromArray(stack3.getCards().filter(c => stack3.getCards().indexOf(c) > stack3.getCards().indexOf(card))));
          nonStateStacksArray[2] = nonStateStacksArray[2].getNewOurStackFromArray(nonStateStacksArray[2].getCards().filter(c => nonStateStacksArray[2].getCards().indexOf(c) > nonStateStacksArray[2].getCards().indexOf(card)))
          break;
        case 3:
          setStack4(stack4.getNewOurStackFromArray(stack4.getCards().filter(c => stack4.getCards().indexOf(c) > stack4.getCards().indexOf(card))));
          nonStateStacksArray[3] = nonStateStacksArray[3].getNewOurStackFromArray(nonStateStacksArray[3].getCards().filter(c => nonStateStacksArray[3].getCards().indexOf(c) > nonStateStacksArray[3].getCards().indexOf(card)))
          break;
        case 4:
          setStack5(stack5.getNewOurStackFromArray(stack5.getCards().filter(c => stack5.getCards().indexOf(c) > stack5.getCards().indexOf(card))));
          nonStateStacksArray[4] = nonStateStacksArray[4].getNewOurStackFromArray(nonStateStacksArray[4].getCards().filter(c => nonStateStacksArray[4].getCards().indexOf(c) > nonStateStacksArray[4].getCards().indexOf(card)))
          break;
        case 5:
          setStack6(stack6.getNewOurStackFromArray(stack6.getCards().filter(c => stack6.getCards().indexOf(c) > stack6.getCards().indexOf(card))));
          nonStateStacksArray[5] = nonStateStacksArray[5].getNewOurStackFromArray(nonStateStacksArray[5].getCards().filter(c => nonStateStacksArray[5].getCards().indexOf(c) > nonStateStacksArray[5].getCards().indexOf(card)))
          break;
        case 6:
          setStack7(stack7.getNewOurStackFromArray(stack7.getCards().filter(c => stack7.getCards().indexOf(c) > stack7.getCards().indexOf(card))));
          nonStateStacksArray[6] = nonStateStacksArray[6].getNewOurStackFromArray(nonStateStacksArray[6].getCards().filter(c => nonStateStacksArray[6].getCards().indexOf(c) > nonStateStacksArray[6].getCards().indexOf(card)))
          break;
        default:
          break;
      }

      switch (fromPile.indexOf(true)) {
        case 0:
          setPile1(pile1.filter(c => pile1.indexOf(c) < pile1.indexOf(card)));
          nonStatePileArray[0] = nonStatePileArray[0].filter(c => nonStatePileArray[0].indexOf(c) < nonStatePileArray[0].indexOf(card))
          break;
        case 1:
          setPile2(pile2.filter(c => pile2.indexOf(c) < pile2.indexOf(card)));
          nonStatePileArray[1] = nonStatePileArray[1].filter(c => nonStatePileArray[1].indexOf(c) < nonStatePileArray[1].indexOf(card))
          break;
        case 2:
          setPile3(pile3.filter(c => pile3.indexOf(c) < pile3.indexOf(card)));
          nonStatePileArray[2] = nonStatePileArray[2].filter(c => nonStatePileArray[2].indexOf(c) < nonStatePileArray[2].indexOf(card))
          break;
        case 3:
          setPile4(pile4.filter(c => pile4.indexOf(c) < pile4.indexOf(card)));
          nonStatePileArray[3] = nonStatePileArray[3].filter(c => nonStatePileArray[3].indexOf(c) < nonStatePileArray[3].indexOf(card))
          break;
        default:
          break;
      }

      // ניקוי הקלפים מה- jackpot לאחר תנועה
      if (fromJackpot) {
        let newJackpot = JackpotOurStack.getNewOurJackpotFromArray(JackpotOurStack.getCards().filter(c => JackpotOurStack.getCards().indexOf(c) !== JackpotOurStack.getCards().indexOf(selectedCards[0])))

        setJackpotOurStack(newJackpot);
        nonStateJackpot = newJackpot;

        console.log("Jackpot cards updated after move");
        console.log("the data that should get in to the jackpot:", newJackpot)
        console.log("Jackpot cards state:");
        console.log(JackpotOurStack)
        console.log(currentGame.getCurrentState());
      }


      if (toLog) console.log("Stacks, Piles and Jackpot updated after move");  // הדפסה לבדיקת הסטקים, הפיילים וה- jackpot לאחר ניקוי
      // console.log("CURRENT GAME:" + currentGame.getCurrentState());
      if (validMove) {
        setNumOfTurns(prev => prev + 1)
      }
    }
  }, [numOfClicks]);


  const updateGame = (state) => {
    setCurrentGame(currentGame.addNewMove(state));
    console.log("Updating game");
  }

  useEffect(() => {
    if (currentGame !== null) {
      console.log("NEW CURRENT GAME:" + currentGame.getCurrentState());
      updateStackAndPile();
      console.log("updating the jackpot by the current game");
    }
  }, [currentGame])

  useEffect(() => {
    if (numOfTurns > 0) {
      updateGame(new GameState(stacksArray, pileArray, JackpotOurStack, numOfTurns));
    }
  }, [numOfTurns])

  useEffect(() => {
    if (numOfTurns > 0) {
      winning();
    }
  }, [currentGame]);

  const winning = () => {
    if (currentGame.getCurrentState().getIsWinning()) {
      setIsWinning(true);
    }
    else {
      setIsWinning(false);
    }
  }

  const updateStackAndPile = () => {
    setStack1(currentGame.getCurrentState().getStacks()[0]);
    setStack2(currentGame.getCurrentState().getStacks()[1]);
    setStack3(currentGame.getCurrentState().getStacks()[2]);
    setStack4(currentGame.getCurrentState().getStacks()[3]);
    setStack5(currentGame.getCurrentState().getStacks()[4]);
    setStack6(currentGame.getCurrentState().getStacks()[5]);
    setStack7(currentGame.getCurrentState().getStacks()[6]);

    setPile1(currentGame.getCurrentState().getPiles()[0]);
    setPile2(currentGame.getCurrentState().getPiles()[1]);
    setPile3(currentGame.getCurrentState().getPiles()[2]);
    setPile4(currentGame.getCurrentState().getPiles()[3]);

    setJackpotOurStack(currentGame.getCurrentState().getJackpot());


    nonStateStacksArray[0] = currentGame.getCurrentState().getStacks()[0];
    nonStateStacksArray[1] = currentGame.getCurrentState().getStacks()[1];
    nonStateStacksArray[2] = currentGame.getCurrentState().getStacks()[2];
    nonStateStacksArray[3] = currentGame.getCurrentState().getStacks()[3];
    nonStateStacksArray[4] = currentGame.getCurrentState().getStacks()[4];
    nonStateStacksArray[5] = currentGame.getCurrentState().getStacks()[5];
    nonStateStacksArray[6] = currentGame.getCurrentState().getStacks()[6];

    nonStatePileArray[0] = currentGame.getCurrentState().getPiles()[0];
    nonStatePileArray[1] = currentGame.getCurrentState().getPiles()[1];
    nonStatePileArray[2] = currentGame.getCurrentState().getPiles()[2];
    nonStatePileArray[3] = currentGame.getCurrentState().getPiles()[3];

    nonStateJackpot = currentGame.getCurrentState().getJackpot();
  }

  const fetchDeck = async () => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
      const data = await response.json();
      setDeckId(data.deck_id);
      solitaire.deckId = data.deck_id;
      // console.log("deckId:", data.deck_id);
    } catch (error) {
      console.error('Error fetching deck:', error);
    }
  };

  const drawDeck = async (id) => {
    try {
      const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${id}/draw/?count=52`);
      const data = await response.json();
      setDeck(data.cards);
      generateDeck(data.cards, data.cards.slice(jackpotNumOfCards, data.cards.length))
      // console.log("jackpotCards:", data.cards.slice(0, jackpotNumOfCards));
    } catch (error) {
      console.error('Error drawing cards:', error);
    }
  };

  const generateDeck = (deck, stacksCards) => {
    if (stacksCards.length > 0 && deck !== undefined) {
      // console.log("stacksCards:", stacksCards);  // הדפסה לבדיקת ה- stacksCards
      generateStacksArrays(stacksCards);
      generateJackpot(deck);
      setCurrentGame(new Game(new GameState(nonStateStacksArray, nonStatePileArray, nonStateJackpot)));
    }
  }

  const generateStacksArrays = (cards) => {
    setStack1(new OurStack(cards.slice(0, 1), 1));
    setStack2(new OurStack(cards.slice(1, 3), 1));
    setStack3(new OurStack(cards.slice(3, 6), 1));
    setStack4(new OurStack(cards.slice(6, 10), 1));
    setStack5(new OurStack(cards.slice(10, 15), 1));
    setStack6(new OurStack(cards.slice(15, 21), 1));
    setStack7(new OurStack(cards.slice(21, 28), 1));

    nonStateStacksArray[0] = new OurStack(cards.slice(0, 1), 1);
    nonStateStacksArray[1] = new OurStack(cards.slice(1, 3), 1);
    nonStateStacksArray[2] = new OurStack(cards.slice(3, 6), 1);
    nonStateStacksArray[3] = new OurStack(cards.slice(6, 10), 1);
    nonStateStacksArray[4] = new OurStack(cards.slice(10, 15), 1);
    nonStateStacksArray[5] = new OurStack(cards.slice(15, 21), 1);
    nonStateStacksArray[6] = new OurStack(cards.slice(21, 28), 1);
  };

  const generateJackpot = (cards) => {
    nonStateJackpot = new OurStack(cards.slice(0, jackpotNumOfCards));
    setJackpotOurStack(new OurStack(cards.slice(0, jackpotNumOfCards)));
  }

  const generateStacks = () => {
    const stacks = [];
    stacks.push(<GameStack name={1} key={1} cards={stack1} />);
    stacks.push(<GameStack name={2} key={2} cards={stack2} />);
    stacks.push(<GameStack name={3} key={3} cards={stack3} />);
    stacks.push(<GameStack name={4} key={4} cards={stack4} />);
    stacks.push(<GameStack name={5} key={5} cards={stack5} />);
    stacks.push(<GameStack name={6} key={6} cards={stack6} />);
    stacks.push(<GameStack name={7} key={7} cards={stack7} />);
    return stacks;
  };

  return (
    <>
      <main className='w-[1200px] h-[730px]'>
        <section className='w-[full] flex-row flex rounded-2'>
          <div className='w-[50%] h-[full] rounded-2 '>
            <Jackpot cards={JackpotOurStack} />
          </div>
          <div className='w-[50%] h-[full] rounded-2 '>
            <div className="flex flex-row justify-around mt-4">
              <FinalStack cards={pile1} />
              <FinalStack cards={pile2} />
              <FinalStack cards={pile3} />
              <FinalStack cards={pile4} />
            </div>
          </div>
        </section>
        <section>
          <div className=' w-[full] flex flex-row justify-content-end'>
            {generateStacks()}
          </div>
        </section>
      </main>
    </>
  );
};

export default Solitaire;