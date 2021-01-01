import React, { Component } from "react";
import { connect } from "react-redux";
import { rebuildGameBoard, updateDimensions } from "../actions";

const mapStateToProps = state => {
  return { 
            columns: state.columns,
            rows: state.rows
          };
};

function mapDispatchToProps(dispatch) {
  return {
    updateDimensions: boardDimensions => dispatch(updateDimensions(boardDimensions)),
    rebuildGameBoard: boardDimensions => dispatch(rebuildGameBoard(boardDimensions))
  };
}

class ConnectedGameSettings extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.rebuildGameBoard({columns:event.target.columns.value, rows:event.target.rows.value})
  }

  render() {

  var rows = this.props.rows
  var columns = this.props.columns
    
   return (
      <div className="game-settings">
 
 <    form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="rows">Rows</label>
          <input
            type="number"
            id="rows" min="1" max="50"
            defaultValue = {rows}
          />
        {/* </div>
        <div> */}
          <label htmlFor="columns">Columns</label>
          <input
            type="number" min="1" max="50"
            id="columns"
            defaultValue = {columns}
          />
        <button type="submit">UPDATE</button>
        </div>
      </form>

      </div>
    );
  }

}

const GameSettings = connect(mapStateToProps, mapDispatchToProps)(ConnectedGameSettings);

export default GameSettings;