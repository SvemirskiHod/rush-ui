import React from 'react';

function NameSearchInput (props) {
  return (
    <div className="input-container">
      <div className="input-group mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Search By Player's Name"
            value={props.nameSearch}
            onKeyDown={props.handleKeyDown}
            onChange={e => props.setNameSearch(e.target.value)}
        />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={props.handleNameSearch}>
              Search
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={props.clearSearch}>
              <i className="fa fa-close"></i>
            </button>
          </div>
      </div>
    </div>
  );
}

export default NameSearchInput;
