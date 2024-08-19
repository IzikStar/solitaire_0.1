import React, { useState, useEffect, useContext } from 'react';
import './Game.css';
import { solitaire, jackpotNumOfCards } from './Solitaire.js';
import Jackpot from './Jackpot.jsx';
import { GameContext } from '../../App.jsx';
import FinakStacks from './FinakStacks.jsx';
import GameStack from './GameStack.jsx';
import { isValidToStacksMove, isValidToPilesMove, getRandomIndex } from './Logic.js';
import FinalStack from './FinalStack.jsx';
import { OurStack } from './OurStack.js';
import { game, Game } from './Game.js';
import { GameState } from './GameState.js';

const Solitaire = () => {
  const [deckId, setDeckId] = useState(null);
  const [jackpotCards, setJackpotCards] = useState([]);
  const [jackpotLength, setJackpotLength] = useState(jackpotNumOfCards);

  const { deck, setDeck, selectedCard, numOfClicks, numOfNewGame, setNumOfNewGame } = useContext(GameContext);

  const [stacksCards, setStacksCards] = useState([]);
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

  const [Jackpot,setJackpot] = useState(new OurStack());
  const stacksArray = [stack1, stack2, stack3, stack4, stack5, stack6, stack7]
  const pileArray = [pile1, pile2, pile3, pile4];

  const currentGame = require(game);


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
    setJackpotCards([]);
    setJackpot(new OurStack())
    fetchDeck();
  }, [numOfNewGame]);

  useEffect(() => {
    if (deckId) {
      drawDeck(deckId);
    }
  }, [deckId]);

  // השפעות על שינוי ב- stacksCards
  useEffect(() => {
    if (stacksCards.length > 0) {
      console.log("stacksCards:", stacksCards);  // הדפסה לבדיקת ה- stacksCards
      generateStacksArrays(stacksCards);
    }
  }, [stacksCards]);

  // השפעות על שינוי ב- selectedCard
  useEffect(() => {
    const toLog = false;  // הגדרת המשתנה בתחילת הפונקציה

    if (selectedCard !== null) {
      if (toLog) console.log("selectedCard:", selectedCard);  // הדפסה לבדיקת ה- selectedCard
      const card = deck.filter(c => c.code === selectedCard)[0];
      if (toLog) console.log("card from deck:", card);  // הדפסה לבדיקת הקלף שנבחר מהחפיסה

      // אתחול משתנים
      const fromStack = new Array(7);
      const fromPile = new Array(4);
      let fromJackpot = false;
      const toStack = new Array(7);
      const toPile = new Array(4);

      let selectedCards = [];

      // בדיקה באיזה סטק הקלף שנבחר נמצא
      for (let i = 0; i < stacksArray.length; i++) {
        if (stacksArray[i].length > 0) {
          for (let j = 0; j < stacksArray[i].length; j++) {
            if (stacksArray[i][j].code === selectedCard) {
              fromStack[i] = true;
              break;
            } else fromStack[i] = false;
          }
          if (fromStack[i] === true) {
            selectedCards = stacksArray[i].filter(c => stacksArray[i].indexOf(c) <= stacksArray[i].indexOf(card));
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
      for (let i = 0; i < jackpotCards.length; i++) {
        if (jackpotCards[i].code === selectedCard) {
          fromJackpot = true;
          selectedCards = [jackpotCards[i]];
          break;
        }
      }
      if (toLog) console.log("fromJackpot:", fromJackpot);  // הדפסה לבדיקת האם הקלף נלקח מה- jackpot
      if (toLog) console.log("selected card fromJackpot:", selectedCards[0]);

      // בדיקה האם הקלף שנבחר תקף להעברה לסטק כלשהו
      for (let i = 0; i < stacksArray.length; i++) {
        if (stacksArray[i].length > 0) {
          if (isValidToStacksMove(selectedCard, stacksArray[i][0].code))
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
          if ((fromStack.indexOf(true) === -1 || stacksArray[fromStack.indexOf(true)][0].code === selectedCard) && isValidToPilesMove(selectedCard, pileArray[i][pileArray[i].length - 1].code))
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
          setPile1(prevPile => [...prevPile, selectedCards[0]]);
          break;
        case 1:
          setPile2(prevPile => [...prevPile, selectedCards[0]]);
          break;
        case 2:
          setPile3(prevPile => [...prevPile, selectedCards[0]]);
          break;
        case 3:
          setPile4(prevPile => [...prevPile, selectedCards[0]]);
          break;
        default:
          break;
      }

      // תנועות לקלפים בתוך הסטק
      if (toPile.indexOf(true) === -1) {
        switch (getRandomIndex(toStack, true)) {
          case 0:
            setStack1(prevStack => [...selectedCards, ...prevStack]);
            break;
          case 1:
            setStack2(prevStack => [...selectedCards, ...prevStack]);
            break;
          case 2:
            setStack3(prevStack => [...selectedCards, ...prevStack]);
            break;
          case 3:
            setStack4(prevStack => [...selectedCards, ...prevStack]);
            break;
          case 4:
            setStack5(prevStack => [...selectedCards, ...prevStack]);
            break;
          case 5:
            setStack6(prevStack => [...selectedCards, ...prevStack]);
            break;
          case 6:
            setStack7(prevStack => [...selectedCards, ...prevStack]);
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
          setStack1(stack1.filter(c => stack1.indexOf(c) > stack1.indexOf(card)));
          break;
        case 1:
          setStack2(stack2.filter(c => stack2.indexOf(c) > stack2.indexOf(card)));
          break;
        case 2:
          setStack3(stack3.filter(c => stack3.indexOf(c) > stack3.indexOf(card)));
          break;
        case 3:
          setStack4(stack4.filter(c => stack4.indexOf(c) > stack4.indexOf(card)));
          break;
        case 4:
          setStack5(stack5.filter(c => stack5.indexOf(c) > stack5.indexOf(card)));
          break;
        case 5:
          setStack6(stack6.filter(c => stack6.indexOf(c) > stack6.indexOf(card)));
          break;
        case 6:
          setStack7(stack7.filter(c => stack7.indexOf(c) > stack7.indexOf(card)));
          break;
        default:
          break;
      }

      switch (fromPile.indexOf(true)) {
        case 0:
          setPile1(pile1.filter(c => pile1.indexOf(c) < pile1.indexOf(card)));
          break;
        case 1:
          setPile2(pile2.filter(c => pile2.indexOf(c) < pile2.indexOf(card)));
          break;
        case 2:
          setPile3(pile3.filter(c => pile3.indexOf(c) < pile3.indexOf(card)));
          break;
        case 3:
          setPile4(pile4.filter(c => pile4.indexOf(c) < pile4.indexOf(card)));
          break;
        default:
          break;
      }

      // ניקוי הקלפים מה- jackpot לאחר תנועה
      if (fromJackpot) {
        setJackpotCards(jackpotCards.filter(c => jackpotCards.indexOf(c) !== jackpotCards.indexOf(card)));
        if (toLog || true) console.log("Jackpot cards updated after move");
      }


      if (toLog) console.log("Stacks, Piles and Jackpot updated after move");  // הדפסה לבדיקת הסטקים, הפיילים וה- jackpot לאחר ניקוי
    }
  }, [numOfClicks]);



  const fetchDeck = async () => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
      const data = await response.json();
      setDeckId(data.deck_id);
      solitaire.deckId = data.deck_id;
      console.log("deckId:", data.deck_id);
    } catch (error) {
      console.error('Error fetching deck:', error);
    }
  };

  const drawDeck = async (id) => {
    try {
      const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${id}/draw/?count=52`);
      const data = await response.json();
      setDeck(data.cards);
      setJackpotCards(data.cards.slice(0, jackpotNumOfCards));
      setStacksCards(data.cards.slice(jackpotNumOfCards, data.cards.length));
      currentGame = new Game(new GameState(stacksArray,pileArray, Jackpot, 0));
      console.log("deck:", data.cards);
      // console.log("jackpotCards:", data.cards.slice(0, jackpotNumOfCards));
    } catch (error) {
      console.error('Error drawing cards:', error);
    }
  };

  const generateStacksArrays = (cards) => {
    setStack1(cards.slice(0, 1),1);
    setStack2(cards.slice(1, 3),1);
    setStack3(cards.slice(3, 6),1);
    setStack4(cards.slice(6, 10),1);
    setStack5(cards.slice(10, 15),1);
    setStack6(cards.slice(15, 21),1);
    setStack7(cards.slice(21, 28),1);
  };

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
      <main className='w-[1200px] h-[1300px] mt-3'>
        <section className='w-[full] flex-row flex rounded-2'>
          <div className='w-[50%] h-[full] rounded-2 '>
            <Jackpot deckId={deckId} cards={jackpot}/>
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
