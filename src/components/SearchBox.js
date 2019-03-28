import React, { Component } from 'react';


class SearchBox extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // }

  render() {
    return (
      <input 
        type={"text"}
        // id={"myInput"}
        className={"main-search"}
        // onkeyup={"myFunction()"}
        placeholder={"Enter keywords to search for Github repository"}
        title={"Type in a name"}
      />
    );
  }
}

export default SearchBox;
