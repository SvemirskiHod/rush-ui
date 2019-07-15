import React from 'react';

function PaginationBlock(props) {
  return (
    <nav>
      <ul className="pagination pagination-sm">
        <li className="page-item">
          <button className="page-link" onClick={props.handlePaginationPrevious}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li className="page-item">
          <button style={{ color: '#a0a5ab' }} disabled className="page-link disabled">
            {props.offset / 25 + 1}
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={props.handlePaginationNext}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationBlock;
