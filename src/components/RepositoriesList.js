import React from 'react';


class RepositoriesList extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextProps.repositoriesListData) !== JSON.stringify(this.props.repositoriesListData)
    );
  }

  render() {
    var renderDataList = () => {
      var dataList = this.props.repositoriesListData.slice();

      return dataList.map((i) => {
        return (
          <li key={i.id}>
            <a href={i.html_url} target="_blank" rel="noopener noreferrer">{i.name}</a>
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
