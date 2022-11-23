import './App.css';
import React, { useState, useEffect } from 'react';
import YelpCard from './components/yelpCard';
import ReactDropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function App() {

  const [keyword, setKeyword] = useState("NYC");
  const [filter, setFilter] = useState('');
  const [transaction, setTransaction] = useState('');

  const filters = [
    { value: '', label: 'Select filter...' },
    { value: 'rating', label: 'Rating' },
    { value: 'review', label: 'Review'},
  ];

  const transactions = [
    { value: '', label: 'All' },
    { value: 'pickup', label: 'Pickup'},
    { value: 'food delivery', label: 'Delivery' },
    { value: 'restaurant_reservation', label: 'Restaurant_reservation'},
  ];

  const [yelpData, setYelpData] = useState();

  const fetchData = () => {
    let param = '?limit=20';
    param += keyword ? '&location=' + keyword : '';
    switch (filter) {
      case 'rating':
        param += '&sort=rating';
        break;
      case 'review':
        param += '&sort=review_count';
        break;
      default:
        break;
    }

    switch (transaction) {
      case '':
        break;
      default:
        param += '&transaction=' + transaction;
        break;
    }

    fetch('http://localhost:8080/retrieveYelpData' + param)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      setYelpData(result);
    })
    .catch(error => {
      console.log('error', error);
      setYelpData(undefined);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [keyword, filter, transaction]);

  return (
    <>
      <div className="search-bar">
        <sapn className="text">Keyword:</sapn>
        <input
          className="search-box"
          type="search"
          placeholder="Search here"
          onChange={(e) => {setKeyword(e.target.value)}}
          value={keyword} />
        <label className='label'>Sort:</label>
        <div className="filter">
          <ReactDropdown options={filters} onChange={(e) => setFilter(e.value)} placeholder="Select filter..." />
        </div>
        <label className='label'>Transaction:</label>
        <div className="filter">
          <ReactDropdown className="transation-list" options={transactions} onChange={(e) => setTransaction(e.value)} placeholder="Select transaction..." />
        </div>
      </div>
      <div className="gallery-wrapper">
        {yelpData && yelpData.map((data, key) => {
          return (
            <YelpCard 
              key = {key}
              img={data.image_url} 
              name = {data.name}
              rating = {data.rating}
              reviewCnt = {data.review_count}
              price = {data.price}
              title = {data.categories}
              url = {data.url}
            />
          )
        })}
      </div>
    </>
  );
}

export default App;
