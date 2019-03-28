import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBox from './components/SearchBox.js';
import RepositoriesList from './components/RepositoriesList.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <input
          // id={this.props.id}
          // ref={this.props.id}
          // disabled={this.disabled ? 'disabled' : ''}
          // style = {Object.assign(textBoxStyle, inputStyle, {fontWeight: this.fontWeight})}
          // className={`${this.state.invalidClass} ${textBoxClass}`}
          // onChange={this.handleOnChanged}
          // onBlur = {this.getValueOnBlur? this.handleEndTextboxInput:  this.handleValidation}
          // onKeyPress = {this.handleKeyPress}
          // // onClick = {this.handleOnClick}
          // onKeyUp= {this.inputTextboxWithGreenCheck && this.props.onKeyUp  ? this.handleValidation : ''}
          // onFocus = {this.handleFocus}
          // onPaste = {this.isSeparate && !this.props.phoneNumber ? this.props.onPaste : ''}
          // onClick={this.handleClicked}
          // value = {`${this.state.value}${rightLabel}`}
          // type={this.type != "" ? this.type:this.props.type}
          // maxLength={this.maxLength}
          placeholder={"Enter keywords to search for Github repository"}
        /> */}

        <div className="main-container">
          <h2>Github Repository Search</h2>

          <SearchBox />

          <RepositoriesList />
        </div>
      </div>
    );
  }
}

export default App;
