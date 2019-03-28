import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBox from './components/SearchBox.js';
import RepositoriesList from './components/RepositoriesList.js';
import dummyData from './dummy-data.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoriesListData: [],
    };
    this.handleKeyUpSearch = this.handleKeyUpSearch.bind(this);
  }

  callSearchApi(searchKeyWord) {
    if (searchKeyWord !== "") {
      var fetchUrl = `https://api.github.com/search/repositories?q=${searchKeyWord}&sort=stars&order=desc&page=1&per_page=5`;
      console.log(fetchUrl);
      // fetch(fetchUrl,
      // {
      //   // credential: include
      //   method: 'GET',
      //   // headers: new Headers({
      //   //   'SESS' : session_name + '=' + sessid,
      //   //   'X-CSRF-TOKEN': token,
      //   //   'Authorization': 'Basic '+btoa('edge:property'),
      //   // }),
      //   // timeout: TIMEOUT
      // })
      // .then((response) => response.json())
      // .then((responseJson) => {
      //   console.log(responseJson);
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
      console.log(dummyData);
      if (dummyData && dummyData.items && dummyData.items.length > 0) {
        this.setState({
          repositoriesListData: dummyData.items
        });
      }
    } else {
      this.setState({
        repositoriesListData: []
      });
    }
  }

  handleKeyUpSearch(e) {
    console.log("handle Key Up Search page level", e.target.value);
    var searchKeyWord = (e && e.target && e.target.value) ? e.target.value : "";

    // The browser url must display the search query upon every keystroke input by the user
    var queryUrl = `?search=${searchKeyWord}`;
    if (window && window.history && window.history.pushState) {
      window.history.pushState(null, null, queryUrl);
    }

    // Call repository search API here
    this.callSearchApi(searchKeyWord);
  }

  render() {

    console.log("this.state.repositoriesListData", this.state.repositoriesListData);

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

          {/* TO DO: Can improve by using cookie to save previous search keywords and search list results */}
          <SearchBox 
            onKeyUpSearch = {this.handleKeyUpSearch}
          />

          <RepositoriesList 
            repositoriesListData = {this.state.repositoriesListData}
          />
        </div>
      </div>
    );
  }
}

export default App;
