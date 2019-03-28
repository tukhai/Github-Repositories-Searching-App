import React, { Component } from 'react';


class RepositoriesList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // }

  render() {
    return (
      <div>
        <ul id="myUL">
          <li><a href="#">Adele</a></li>
          <li><a href="#">Agnes</a></li>

          <li><a href="#">Billy</a></li>
          <li><a href="#">Bob</a></li>

          <li><a href="#">Calvin</a></li>
          <li><a href="#">Christina</a></li>
          <li><a href="#">Cindy</a></li>
        </ul>

        <div class="center">
          <div class="pagination">
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a href="#" class="active">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">&raquo;</a>
          </div>
        </div>
      </div>
    );
  }
}

export default RepositoriesList;
