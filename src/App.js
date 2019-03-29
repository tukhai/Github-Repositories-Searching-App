import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBox from './components/SearchBox.js';
import RepositoriesList from './components/RepositoriesList.js';
import Pagination from './components/Pagination.js'
import dummyData from './dummy-data.json';

const PAGESIZE = 10;

class App extends Component {
  countdown;

  constructor(props) {
    super(props);

    let params = new URLSearchParams(window.location.search);
    let defaultSearchKeywordFromQueryUrl = params.get('search') ? params.get('search') : "";

    this.state = {
      repositoriesListData: [],
      listCount: 0,
      defaultSearchKeyword: defaultSearchKeywordFromQueryUrl,
      currentPage: 1,
      isShowLoadingIcon: true // initially it must be true, so when first load can see load icon
    };
    this.handleKeyUpSearch = this.handleKeyUpSearch.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  callSearchApi(searchKeyword, page) {
    if (searchKeyword !== "") {
      var fetchUrl = `https://api.github.com/search/repositories?q=${searchKeyword}&sort=stars&order=desc&page=${page ? page : "1"}&per_page=${PAGESIZE}`;

      fetch(fetchUrl,
      {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var dataList = [];
        var dataCount = 0;
        if (responseJson && responseJson.items && responseJson.items.length > 0) {
          dataList = responseJson.items;
          dataCount = responseJson.total_count;
        }

        this.setState({
          repositoriesListData: dataList,
          listCount: dataCount,
          isShowLoadingIcon: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      this.setState({
        repositoriesListData: [],
        listCount: 0,
        isShowLoadingIcon: false
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

    // Show the loading icon
    if (!this.state.isShowLoadingIcon) {
      this.setState({
        isShowLoadingIcon: true
      });
    }

    clearTimeout(this.countdown);
    this.countdown = setTimeout(() => {
      // When finish 3s, must call search API, show the tick icon inside call api funcion
      this.callSearchApi(searchKeyword);

      // When calling new api, should set currentPage to 1
      this.setState({
        currentPage: 1
      });
    }, 3000);
  }

  handleChangePage(page) {
    let params = new URLSearchParams(window.location.search);
    let currentSearchQuery = params.get('search') ? params.get('search') : "";

    this.setState({
      currentPage: page,
      isShowLoadingIcon: true
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
          <div>
            <SearchBox
              onKeyUpSearch = {this.handleKeyUpSearch}
              defaultSearchKeyword = {this.state.defaultSearchKeyword}
            />
            <div className="icons-container">
              {this.state.isShowLoadingIcon ?
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                :
                <div className="tick-icon">
                  <span>&#10003;</span>
                </div>
              }
            </div>
          </div>

          <div style={{clear: "both"}}></div>
          <h4>{statsText}</h4>

          <RepositoriesList 
            repositoriesListData = {this.state.repositoriesListData}
          />

          <Pagination 
            totalItems = {this.state.listCount < 1000 ? this.state.listCount : 1000} // because this api can only show first 1000 results
            pageSize = {PAGESIZE}
            currentPage = {this.state.currentPage}
            maxPages = {10}
            onChangePage = {this.handleChangePage}
          />
        </div>

        <div className="instruction-content">
          * As Github only allow first 1000 search results, although you can see more than 1000 results found, the app only show until the 1000th result.
        </div>
      </div>
    );
  }
}

export default App;
