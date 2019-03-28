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
      </div>
    );
  }
}

export default RepositoriesList;
