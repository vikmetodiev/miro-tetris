import { useState, useCallback } from 'react';

import { STAGE_WIDTH, checkCollision } from './board';
import { BLOCKS, randomBlock } from './figures.js';

export const useFigure = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    figure: BLOCKS[0].shape,
    collided: false,
  });

  const updateFigure = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
      collided,
    }))
  }

  const rotate = (matrix, dir) => {
    // Make the rows to become cols (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index]),
    );
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const figureRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.figure = rotate(clonedPlayer.figure, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.figure[0].length) {
        rotate(clonedPlayer.figure, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      figure: randomBlock().shape,
      collided: false,
    })
  }, [])

  return [player, updateFigure, resetPlayer, figureRotate];
}