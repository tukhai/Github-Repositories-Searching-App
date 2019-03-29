import React from 'react';


class Pagination extends React.Component {

  totalItems = 0;
  pageSize = 10;  
  currentPage = 1;
  maxPages = 10;
  isFirst = true;

  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(page) {
    if(typeof this.props.onChangePage === "function") {      
      this.props.onChangePage(page);      
    }
  }
  
  initStyle() {
    if(this.props.totalItems !== undefined && this.props.totalItems !== this.totalItems)
    {
      this.totalItems = this.props.totalItems;
    }
    if(this.props.pageSize !== undefined && this.props.pageSize !== this.pageSize)
    {
      this.pageSize = this.props.pageSize;
    }
    if(this.props.currentPage !== undefined && this.props.currentPage !== this.currentPage)
    {
      this.currentPage = this.props.currentPage;
    }
    if(this.props.maxPages !== undefined && this.props.maxPages !== this.maxPages)
    {
      this.maxPages = this.props.maxPages;
    }
  }

  calculatePagination() {
    // calculate total pages
    
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    let startPage, endPage;
    
    if (this.totalPages <= this.maxPages) {
      // less than maxPages total pages so show all      
        if(this.currentPage > 2) {
          if(this.totalPages - this.currentPage < 5) {    
            var temp = (this.totalPages - (this.maxPages / 2)) + 1;              
            startPage = (temp > 0)? temp : 1;
            endPage = this.totalPages;
          } else {            
            startPage = this.currentPage-1;
            endPage = this.totalPages;
          } 
        } else {          
          startPage = 1;
          endPage = this.totalPages;
        }            
    } else {
      // more than maxPages total pages so calculate start and end pages
      if (this.currentPage < (Math.ceil(this.maxPages / 2) -2)) { // first  
        this.isFirst = true;
        startPage = 1;
        endPage = this.maxPages;      
      } else if (this.currentPage >= this.totalPages) { // last 
        this.isFirst = false;        
        startPage = this.currentPage - (this.maxPages - 1);
        endPage = this.currentPage;
      } else { // middle            
        if(this.isFirst) {
          startPage = this.currentPage - 1;
          endPage = startPage + (this.maxPages - 1);
        } else {
          startPage = this.currentPage - (this.maxPages - 1);
          endPage = this.currentPage + 1;
        }           
      }
      
      if(startPage <= 0) {
        startPage = 1;
      }
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
      }
    }
    
    this.startPage = startPage;
    this.endPage = endPage;    
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.totalItems !== this.props.totalItems ||
      nextProps.currentPage !== this.props.currentPage
    );
  }

  render() {
    this.initStyle();
    this.calculatePagination();

    var renderPageLinks = () => {
      
        var pages = [];
        for(var i = this.startPage; i <= this.endPage; i++) {      
          pages.push(i);
        }             
        return pages.map((page) => {        
          if(pages.length > 5) {          
            if(this.isFirst) {
              if(page == pages[0] || page == pages[1] || page == pages[2] || page == pages[pages.length-1]) {
                return(
                    <a 
                        key={"page_" + page}
                        className={page == this.currentPage ? "active" : ""}
                        onClick={() => this.handleChangePage(page)}
                    >
                        {page}
                    </a>
                );
              } else {                    
                if(page == pages[3]) {
                  return(
                    <a className="no-click-pagination" key="ellipis_span">...</a>
                  );
                }
              }
            } else {            
              if(page == pages[0] || page == pages[pages.length-3] || page == pages[pages.length-2] || page == pages[pages.length-1]) {
                return(
                    <a 
                        key={"page_" + page}
                        className={page == this.currentPage ? "active" : ""}
                        onClick={() => this.handleChangePage(page)}
                    >
                        {page}
                    </a>
                );
              } else {                    
                if(page == pages[1]) {
                  return(
                    <a className="no-click-pagination" key="ellipis_span">...</a>
                  );
                }
              }
            }
          } else {
            return(
              <a 
                  key={"page_" + page}
                  className={page == this.currentPage ? "active" : ""}
                  onClick={() => this.handleChangePage(page)}
              >
                  {page}
              </a>
            );
          }             
        });
    };
      
    var renderFirstLink = () => {
        if(this.currentPage === 1) {
          return (
            <a 
              key={"page_first"}
              className="no-click-pagination"
            >
              First
            </a>
          );
        }
        else {
          return (
            <a 
                key={"page_first"}
                onClick={() => this.handleChangePage(1)}
            >
                First
            </a>
          );
        }
    };
      
    var renderLastLink = () => {
        
        if(this.currentPage === this.totalPages) {
          return (
            <a 
                key={"page_last"}
                className="no-click-pagination"
            >
                Last
            </a>
          );
        }
        else {
          return (
            <a 
                key={"page_last"}
                onClick={() => this.handleChangePage(this.totalPages)}
            >
                Last
            </a>
          );
        }
    };
      
    return (
        <div className="center">
          <div className="pagination">
            {renderFirstLink()}
            {renderPageLinks()}
            {renderLastLink()}
          </div>
        </div>
    );
  }
}

export default Pagination;