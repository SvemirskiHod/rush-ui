import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainContainer() {
  const [players, setPlayers] = useState();
  const [nameSearch, setNameSearch] = useState('');
  // const [sortBy, setSortBy] = useState('');
  // const [sortOrder, setSortOrder] = useState('');
  const [offset, setOffset] = useState(0);

  // useEffect(() => {
    // makeRequest({ offset: 0 });
  // }, []);

  useEffect(() => {
    console.log(offset);
    makeRequest({ offset })
  }, [offset]);

  const makeRequest = (options = {}) => {
    const { nameSearch, offset, sortBy, sortOrder } = options;
    let url = 'https://rush-api.herokuapp.com/players?';
    if (nameSearch) {
      url += `&name_search=${nameSearch}`;
    } else {
      url += `&offset=${offset || 0}`;
    }
    if (sortBy) {
      url += `&sort_by=${sortBy}&sort_order=${sortOrder || 'asc'}`;
    }
    axios.get(url)
      .then(({ data }) => { setPlayers(data) })
      .catch(console.error);
  };

  const handleNameSearch = () => {
    makeRequest({ nameSearch });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      makeRequest({ nameSearch });
    }
  }

  const handlePaginationPrevious = () => {
    if ((offset - 25) < 0) {
      setOffset(325);
    } else {
      setOffset(offset - 25);
    }
  }

  const handlePaginationNext = () => {
    if (offset === 325) {
      setOffset(0);
    } else {
      setOffset(offset + 25);
    }
  }

  const table =
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Team</th>
          <th>Pos</th>
          <th>Att/G</th>
          <th>Att</th>
          <th className="clickable-sort">
            Yrds
            <i className="fa fa-sort-up"></i>
            <i className="fa fa-sort-down"></i>
          </th>
          <th>Avg</th>
          <th>Yds/G</th>
          <th className="clickable-sort">
            TD
            <i className="fa fa-sort-up"></i>
            <i className="fa fa-sort-down"></i>
          </th>
          <th className="clickable-sort">
            Lng
            <i className="fa fa-sort-up"></i>
            <i className="fa fa-sort-down"></i>
          </th>
          <th>1st</th>
          <th>1st%</th>
          <th>20+</th>
          <th>40+</th>
          <th>FUM</th>
        </tr>
      </thead>
      <tbody>
        {
          players ?
          players.map((player, index) =>
            <tr key={player.Player + index}>
              <th>{player['Player']}</th>
              <td>{player['Team']}</td>
              <td>{player['Pos']}</td>
              <td>{player['Att/G']}</td>
              <td>{player['Att']}</td>
              <td>{player['Yds']}</td>
              <td>{player['Avg']}</td>
              <td>{player['Yds/G']}</td>
              <td>{player['TD']}</td>
              <td>{player['Lng']}</td>
              <td>{player['1st']}</td>
              <td>{player['1st%']}</td>
              <td>{player['20+']}</td>
              <td>{player['40+']}</td>
              <td>{player['FUM']}</td>
            </tr>
          ) : null
        }
      </tbody>
    </table>


  return (
    <div className="main-grid">

      {/* TODO: Serch Component */}
      <div className="input-container">
        <div className="input-group mb-3">
          <input
              type="text"
              className="form-control"
              placeholder="Search By Player's Name"
              value={nameSearch}
              onKeyDown={handleKeyDown}
              onChange={e => setNameSearch(e.target.value)}
          />
            <div className="input-group-append">
              <button
                className="btn btn-light"
                type="button"
                onClick={handleNameSearch}>
                Search
              </button>
            </div>
        </div>
      </div>

      {/* TODO: Pagination Component */}
      <nav>
        <ul className="pagination pagination-sm">
          <li className="page-item">
            <button className="page-link" onClick={handlePaginationPrevious}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button style={{ color: '#a0a5ab' }} disabled className="page-link disabled">
              {offset / 25 + 1}
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={handlePaginationNext}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* TODO: Make table its own component */}
      { players ? table : <h2>Loading...</h2> }
      {/* END TABLE */}

    </div>
  );
}

export default MainContainer;
