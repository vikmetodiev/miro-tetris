export const BLOCKS = {
    0: { shape: [[0]], color: '0, 0, 0' },
    I: {
      shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]],
      color: '153, 255, 51',
    },
    J: {
      shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]],
      color: '255, 204, 255',
    },
    L: {
      shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']],
      color: '255, 255, 51',
    },
    O: {
      shape: [['O', 'O'], ['O', 'O']],
      color: '255, 198, 51',
    },
    S: {
      shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]],
      color: '102, 102, 255',
    },
    T: {
      shape: [['T', 'T', 'T'], [0, 'T', 0],[0, 0, 0]],
      color: '0, 255, 255',
    },
    Z: {
      shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]],
      color: '227, 78, 78',
    },
  };

export const randomBlock = () => {
    const block = 'IJLOSTZ';
    const randomFigure = 
    block[Math.floor(Math.random()* block.length)]
    return BLOCKS[randomFigure]
}