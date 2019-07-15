import React from 'react';

function PlayersTable(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Team</th>
          <th>Pos</th>
          <th>Att/G</th>
          <th>Att</th>
          <th onClick={() => { props.handleSortClick('Yds') } }
            className="clickable-sort">
            Yrds
            <i className={props.determineClasses('asc', 'Yds')}></i>
            <i className={props.determineClasses('desc', 'Yds')}></i>
          </th>
          <th>Avg</th>
          <th>Yds/G</th>
          <th onClick={() => { props.handleSortClick('TD') } }
            className="clickable-sort">
            TD
            <i className={props.determineClasses('asc', 'TD')}></i>
            <i className={props.determineClasses('desc', 'TD')}></i>
          </th>
          <th onClick={() => { props.handleSortClick('Lng') } }
            className="clickable-sort">
            Lng
            <i className={props.determineClasses('asc', 'Lng')}></i>
            <i className={props.determineClasses('desc', 'Lng')}></i>
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
          props.players.map((player, index) =>
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
          )
        }
      </tbody>
    </table>
  );
}

export default PlayersTable;
