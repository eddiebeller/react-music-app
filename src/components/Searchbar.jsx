import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchInput}`);
  };
  return (
    <form
      className="p-2 text-gray-400 focus-within:text-gray-600"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="search">
        Search songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-6 h-6 ml-4" />
        <input
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
          type="search"
          autoComplete="off"
          name="search"
          id="search"
          placeholder="Search..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
