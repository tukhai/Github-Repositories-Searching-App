import React from 'react';


class RepositoriesList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // }

  render() {
    var renderDataList = () => {
      var dataList = this.props.repositoriesListData.slice();

      return dataList.map((i) => {
        return (
          <li key={i.id}>
            <a href={i.html_url} target="_blank">{i.name}</a>
          </li>
        );
      });
    }

    return (
      <div>
        <ul id="myUL">
          {renderDataList()}
        </ul>

        <div className="center">
          <div className="pagination">
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a href="#" className="active">2</a>
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
