import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parse as csv } from 'json2csv';

// Import Components
import NameSearchInput from './nameSearchInput.js';
import PlayersTable from './playersTable.js';
import PaginationBlock from './paginationBlock.js';

function MainContainer() {
  // Declare Hooks
  const [players, setPlayers] = useState();
  const [nameSearch, setNameSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [offset, setOffset] = useState(0);

  // Main Request Function
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

  useEffect(() => {
    makeRequest({ offset, sortOrder, sortBy })
  }, [offset]);

  useEffect(() => {
    setOffset(0);
    makeRequest({ sortBy, sortOrder })
  }, [sortBy, sortOrder]);

  const handleNameSearch = () => {
    makeRequest({ nameSearch });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      makeRequest({ nameSearch });
    }
  }

  const clearSearch = () => {
    setNameSearch('');
    setOffset(0);
    setSortBy('');
    setSortOrder('');
    makeRequest();
  };

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

  const handleSortClick = (new_type) => {
    if (new_type === sortBy) {
      sortOrder === 'asc'
        ? setSortOrder('desc')
        : setSortOrder('asc');
    } else {
      setSortOrder('asc');
    }
    setSortBy(new_type);
  }

  const determineClasses = (sort_order, sort_type) => {
    let classes = `fa fa-sort-${sort_order === 'asc' ? 'up' : 'down'}`;
    if (sortBy === sort_type && sort_order === sortOrder) {
      classes += ' sort-selected';
    }
    return classes;
  };

  const handleSaveAsCsv = () => {
    const csvData = csv(players);
    const filename = 'players.csv';
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create New anchor tag and attach the downloadable to it
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    // Simulate Click for download
    elem.click();
    document.body.removeChild(elem);
  };

  return (
    <div className="main-grid">

      <div className="main-grid-actions">
        <NameSearchInput
          nameSearch={nameSearch}
          handleKeyDown={handleKeyDown}
          setNameSearch={setNameSearch}
          handleNameSearch={handleNameSearch}
          clearSearch={clearSearch}
        />

        <PaginationBlock
          offset={offset}
          handlePaginationPrevious={handlePaginationPrevious}
          handlePaginationNext={handlePaginationNext}
        />

          <button onClick={handleSaveAsCsv}
            className="btn btn-light">
            Download Results as CSV
          </button>
      </div>

      {/* Players Table - Render Conditionally */}
      { players
        ? <PlayersTable
          handleSortClick={handleSortClick}
          determineClasses={determineClasses}
          players={players}
        />
        : null
      }

    </div>
  );
}

export default MainContainer;
