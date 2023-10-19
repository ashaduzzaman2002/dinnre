import React, { useContext, useEffect, useState } from 'react';
import './search.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { baseURL } from '../../helper/api';
import axios from 'axios';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { city, setLoading } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurantOfCity = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${baseURL}/restaurants/${city}/all`
      );
      setRestaurants(data.restaurants);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurantOfCity();
  }, []);


  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 1) {
      const filteredResults = restaurants.filter((result) =>
        result.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };


  return (
    <div className="container mt-5 pt-5" style={{ minHeight: '32vh' }}>
      <div className="row justify-content-center mt-5 w-100">
        <div className="col-md-10 col-12">
          <div className="input-group">
            <input
              type="search"
              className="form-control py-2 rounded-right search-input"
              placeholder="Enter your restaurant name..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {searchQuery.length >= 1 && (
            <div className="mt-2">
              {searchResults.length > 0 ? (
                <ul className="search-results">
                  {searchResults.map((result, i) => (
                    <li key={i}>
                      <Link className="" to={`/menu/restaurant/${result._id}`}>
                        {result.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="alert search-results mt-3 no-results">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
