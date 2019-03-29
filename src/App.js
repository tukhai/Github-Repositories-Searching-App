import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBox from './components/SearchBox.js';
import RepositoriesList from './components/RepositoriesList.js';
import Pagination from './components/Pagination.js'
import dummyData from './dummy-data.json';

const PAGESIZE = 5;

class App extends Component {
  constructor(props) {
    super(props);

    let params = new URLSearchParams(window.location.search);
    let defaultSearchKeywordFromQueryUrl = params.get('search') ? params.get('search') : "";

    this.state = {
      repositoriesListData: [],
      listCount: 0,
      defaultSearchKeyword: defaultSearchKeywordFromQueryUrl,
      currentPage: 1
    };
    this.handleKeyUpSearch = this.handleKeyUpSearch.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  callSearchApi(searchKeyword, page) {
    if (searchKeyword !== "") {
      var fetchUrl = `https://api.github.com/search/repositories?q=${searchKeyword}&sort=stars&order=desc&page=${page ? page : "1"}&per_page=${PAGESIZE}`;
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
          repositoriesListData: dummyData.items,
          listCount: dummyData.total_count
        });
      }
    } else {
      this.setState({
        repositoriesListData: [],
        listCount: 0
      });
    }
  }

  handleKeyUpSearch(e) {
    var searchKeyword = (e && e.target && e.target.value) ? e.target.value : "";

    // The browser url must display the search query upon every keystroke input by the user
    var queryUrl = `?search=${searchKeyword}`;
    if (window && window.history && window.history.pushState) {
      window.history.pushState(null, null, queryUrl);
    }

    // Call repository search API here
    // For task 2, have to do here, so we prevent callSearchApi as handleKeyUpSearch
    this.callSearchApi(searchKeyword);
  }

  handleChangePage(page) {
    let params = new URLSearchParams(window.location.search);
    let currentSearchQuery = params.get('search') ? params.get('search') : "";

    this.setState({
      currentPage: page
    });

    this.callSearchApi(currentSearchQuery, page);
  }

  componentDidMount() {
    // Call repository search API when there's query string in url
    this.callSearchApi(this.state.defaultSearchKeyword);
  }

  render() {
    var statsText = "No Repository Found";
    if (this.state.listCount) {
      if (this.state.listCount > 1) {
        statsText = `${this.state.listCount} Repositories Found`;
      } else if (this.state.listCount == 1) {
        statsText = "1 Repository Found";
      }
    }

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
            defaultSearchKeyword = {this.state.defaultSearchKeyword}
          />

          <h4>{statsText}</h4>

          <RepositoriesList 
            repositoriesListData = {this.state.repositoriesListData}
          />

          <Pagination 
            totalItems = {this.state.listCount}
            pageSize = {PAGESIZE}
            currentPage = {this.state.currentPage}
            maxPages = {10}
            onChangePage = {this.handleChangePage}
          />
        </div>
      </div>
    );
  }
}

export default App;
