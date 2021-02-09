
import React from 'react';
import { StyledCell } from './StyledCell';
import { BLOCKS } from './figures.js';
const Cell = ({ type }) => (

  <StyledCell type={type} color={BLOCKS[type].color} />
)

export default Cell;