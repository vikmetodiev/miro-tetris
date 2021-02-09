import React from "react"
import { Container } from 'reactstrap';
let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let hash = "#" + randomColor
    let style = {color: hash,marginBot:-40}
    const Header = () =>{
    return (<Container><h1 className="header" style={style}>Tetris</h1></Container>)
}
export default Header