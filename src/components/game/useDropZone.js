import { useDrop } from 'react-dnd';
import { CARD } from './Card';
import { isLegalMove } from './moves';

/** Makes an element accept a dragged card when the move to `dest` is legal. */
export const useDropZone = (state, dest, onDrop) => {
  const [{ active }, dropRef] = useDrop(
    () => ({
      accept: CARD,
      canDrop: (item) => !!state && isLegalMove(state, item.code, dest),
      drop: (item) => onDrop(item.code, dest),
      collect: (monitor) => ({ active: monitor.isOver() && monitor.canDrop() }),
    }),
    [state, dest.area, dest.index, onDrop],
  );
  return [active, dropRef];
};
