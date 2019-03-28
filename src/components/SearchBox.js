import React from 'react';


class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: null,
    // };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
    console.log("handle Key Up");
    if (typeof this.props.onKeyUpSearch === "function") {
      this.props.onKeyUpSearch(e);
    }
  }

  render() {
    return (
      <input 
        className={"main-search"}
        type={"text"}
        // id={"myInput"}
        onKeyUp={this.handleKeyUp}
        placeholder={"Enter keywords to search for Github repository"}
        title={"Type in a name"}
        defaultValue={this.props.defaultSearchKeyword ? this.props.defaultSearchKeyword : ""}
      />
    );
  }
}

export default SearchBox;
