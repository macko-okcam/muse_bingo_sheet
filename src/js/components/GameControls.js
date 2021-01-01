import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNextCycle } from "../actions";


const mapStateToProps = state => {
  return { 
            state : "paused"
          };
};

function mapDispatchToProps(dispatch) {
  return {
    updateNextCycle: info  => dispatch(updateNextCycle(info))
  };
}

class ConnectedGameControls extends Component {

  constructor(props) {
    super(props);

    this.clickInvert = this.clickInvert.bind(this)
    this.clickClear = this.clickClear.bind(this)
    this.clickNextCycle = this.clickNextCycle.bind(this)
  }

  clickInvert(event) {
    this.props.updateNextCycle({updateType:"invert"})
  }

  clickClear(event) {
    this.props.updateNextCycle({updateType:"clear"})
  }

  clickNextCycle(event) {
    this.props.updateNextCycle({updateType:"next"})
  }


  render() {

    
   return (
      <div className="game-controls">
 
        <button type="button" value="invert" onClick={this.clickInvert}>INVERT BOARD</button>
        <button type="button" value="next_cycle" onClick={this.clickClear} >CLEAR BOARD</button>
        <button type="button" value="next_cycle" onClick={this.clickNextCycle} >NEXT CYCLE</button>
        <button type="button" value="auto_cycle" onClick={this.clickAutoCycle} disabled >AUTO CYCLE</button>

      </div>
    );
  }

}

const GameControls = connect(mapStateToProps, mapDispatchToProps)(ConnectedGameControls);

export default GameControls;