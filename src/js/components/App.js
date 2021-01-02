import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "../store/index";

import img from './590892710274007042.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/main.scss';
import GameBoard from "./GameBoard";
import BingoSheet from "./BingoSheet";
import GameSettings from "./GameSettings";
import GameControls from "./GameControls";

class App extends Component {
  constructor() {
    super();

    this.state = {
      
    };

  }


  render() {
    return (

      <>

        <BingoSheet></BingoSheet>
        {/* <GameBoard></GameBoard> */}
        {/* <GameControls></GameControls>
        <GameSettings></GameSettings> */}
        <h1>This is the template Bingo Sheet</h1>
        <img src={img} />
      </>
    );
  }
}

export default App;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(
                            <Provider store={store}>
                              <App />
                            </Provider>, wrapper) : false;