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

  return (
    <div className="main-grid">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Player</th>
          <th scope="col">Team</th>
          <th scope="col">Pos</th>
          <th scope="col">Att/G</th>
          <th scope="col">Att</th>
          <th scope="col">Yrds</th>
          <th scope="col">Avg</th>
          <th scope="col">Yds/G</th>
          <th scope="col">TD</th>
          <th scope="col">Lng</th>
          <th scope="col">1st</th>
          <th scope="col">1st%</th>
          <th scope="col">20+</th>
          <th scope="col">40+</th>
          <th scope="col">FUM</th>
        </tr>
      </thead>
      <tbody>
        {
          players ?
          players.map((player) =>
            <tr>
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
          )
          : null
        }
      </tbody>
    </table>



    </div>
  );
}

export default MainContainer;
