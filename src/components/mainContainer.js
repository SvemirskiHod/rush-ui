import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import Components
import NameSearchInput from './NameSearchInput';
import PlayersTable from './PlayersTable';
import PaginationBlock from './PaginationBlock';

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

  return (
    <div className="main-grid">

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
