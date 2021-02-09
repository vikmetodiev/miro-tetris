import React, { useState } from "react";
import Stage from "./Stage.js";
import Display from "./Display.js";
import GameStartButton from "./GameStartButton.js";
import { useFigure } from "./FigureSettings";
import { useStage } from "./StageSettings";
import { createStage, checkCollision } from "./board";
import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris.js";
import { useInterval } from "./useInterval";
import { useGameStatus } from "./useGameStatus";
import { Button, Container } from "reactstrap";
const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [pauseGame, setPauseGame] = useState(false);
  const [player, updateFigure, resetPlayer, figureRotate] = useFigure();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const moveLeftOrRight = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updateFigure({ x: direction, y: 0 });
    }
  };
  useInterval(() => {
    drop();
  }, dropTime);

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
    setPauseGame(false);
  };

  const pausingGame = () => {
    setDropTime(1000000000);
    setPauseGame(!pauseGame);
    if (!pauseGame) {
      setDropTime(1000000000);
    } else {
      setDropTime(1000);
    }
  };
  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updateFigure({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updateFigure({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const dropPlayer = () => {
    console.log("interval off");
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        moveLeftOrRight(-1);
      } else if (keyCode === 39) {
        moveLeftOrRight(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        figureRotate(stage, 1);
      }
    }
  };
  return (
    <Container>
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        onKeyUp={keyUp}
        className="tetris-body"
      >
        <StyledTetris>
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Lines: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
            )}
            <GameStartButton callback={startGame} />
            <br />
            <br />
            <Button onClick={pausingGame} className="buttonPause">
              {!pauseGame ? "Pause Game" : "Unpause Game"}
            </Button>
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
    </Container>
  );
};
export default Tetris;
