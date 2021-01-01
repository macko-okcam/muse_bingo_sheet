import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { clickCell } from "../actions";


const mapStateToProps = (state, ownProps) => {
  return { 
            isAlive: state.cellBoardArray[ownProps.id],
          };
};

function mapDispatchToProps(dispatch) {
  return {
    clickCell: cellState => dispatch(clickCell(cellState))
  };
}

class ConnectedCell extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
       
     this.props.clickCell( {index: this.props.id, isAlive: !this.props.isAlive} )
  }

  render() {
    return (
      <button id={this.props.id} 
              className={classNames({square: true, live_cell: this.props.isAlive})} 
              onClick={this.handleClick}>
        {/* TODO */}
      </button>
    );
  }

}

const Cell = connect(mapStateToProps, mapDispatchToProps)(ConnectedCell);

export default Cell;