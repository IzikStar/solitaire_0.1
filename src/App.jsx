import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import Footer from './components/Footer';
import Backdrop from './components/Backdrop';
import Solitaire from './components/game/Solitaire';
import { useSolitaire } from './components/game/useSolitaire';

function App() {
  const game = useSolitaire();
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative isolate flex min-h-screen flex-col">
        <Backdrop seed={game.background} />
        <Header game={game} />
        <div className="flex-1">
          <Solitaire game={game} />
        </div>
        <Footer />
      </div>
    </DndProvider>
  );
}

export default App;
