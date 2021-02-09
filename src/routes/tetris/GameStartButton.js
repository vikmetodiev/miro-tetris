import React from "react"
import {StyledStartButton} from "./StyledStartButton"
const GameStartButton = ({callback}) => {
   return <StyledStartButton className="buttonStart" onClick={callback}>Start Game</StyledStartButton>
}

export default GameStartButton