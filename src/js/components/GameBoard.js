import React, { Component } from "react";
import { connect } from "react-redux";
import Cell from "./Cell";
import { rebuildGameBoard } from "../actions";

const mapStateToProps = state => {
  return { 
            columns: state.columns,
            rows: state.rows,
          };
};

function mapDispatchToProps(dispatch) {
  return {
    rebuildGameBoard: boardDimensions => dispatch(rebuildGameBoard(boardDimensions))
  };
}

class ConnectedGameBoard extends Component {
  constructor(props) {
    super(props);

    this.props.rebuildGameBoard({columns:this.props.columns, rows:this.props.rows}) 

  }

  renderSquare(i) {
    
    
    return <Cell id={i} key={"cell" + i}></Cell>;
  }

  renderRow(min, max) {

    
    
    
    var rowArray = []

    for (let index = min; index <= max; index++) {
      rowArray.push(this.renderSquare(index))   
    }

    return (
      <div className="board-row" key={"row" + min + "to" + max}>
        {rowArray}
      </div>
    )
  }

  renderBoard(rows, columns){

    var boardArray = []
    for (let index = 0; index < rows; index++) {
      
      let min = index * columns;
      let max = min + columns - 1;
      // console.log("rendering " + min + " to " + max);
      boardArray.push(this.renderRow(min, max))
      
    }

    return (

      <div className="game-board">
        {boardArray}
      </div>
    )

  }

  render() {

   return (
      <div className="game-board">
 
        {this.renderBoard(this.props.rows, this.props.columns)}

      </div>
    );
  }

}

const GameBoard = connect(mapStateToProps, mapDispatchToProps)(ConnectedGameBoard);

export default GameBoard;