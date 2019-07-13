import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainContainer() {
  const [players, setPlayers] = useState();

  useEffect(() => {
    axios.get('https://rush-api.herokuapp.com/players?offset=0')
      .then(({ data }) => {
        setPlayers(data);
      });
  }, []);

  const table =
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Team</th>
          <th>Pos</th>
          <th>Att/G</th>
          <th>Att</th>
          <th>Yrds</th>
          <th>Avg</th>
          <th>Yds/G</th>
          <th>TD</th>
          <th>Lng</th>
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
          <input type="text" className="form-control" placeholder="Search By Player's Name" aria-label="Search By Player's Name" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-light" type="button" id="button-addon2">Search</button>
            </div>
        </div>
      </div>

      {/* TODO: Pagination Component */}
      <nav>
        <ul className="pagination pagination-sm">
          <li className="page-item">
            <button className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button style={{ color: '#a0a5ab' }} disabled className="page-link disabled">2</button>
          </li>
          <li className="page-item">
            <button className="page-link" href="#" aria-label="Next">
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
