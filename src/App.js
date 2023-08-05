import React from 'react';
import Card from './components/Card/Card'
import './App.css'
import Data from './data/houseData1.json'
import Filter from './components/filter/Filter';
import {ImLocation2} from 'react-icons/im'
import {BsHouseFill} from 'react-icons/bs'
import {RiHomeSmile2Fill} from 'react-icons/ri'
import {MdExpandMore} from 'react-icons/md'
import DatePickerComponent from './components/filter/DatePickerComponent';
import RangeSlider from './components/filter/RangeSlider';
import Select from "react-select";

export default function App() {
  // Move In date filter 
  const newDate = Date();
  const [Dateobj, setObj] = React.useState(newDate);
  const [seenDate, setSeen] = React.useState(toString(newDate).split(" "));
  const onDateChange = (newValue) => {
    setObj(newValue);
    setSeen(toString(newValue).split(" "));
  }
  // Move In date filter 

  // range
  const [PriceRange, setPrice] = React.useState([5000,20000]);

  const handlePriceChange = (newValue) => {
    setPrice(newValue);
  };
  // range

  const [loc, setLoc] = React.useState("");
  const [houseType, setType] = React.useState("");

  // options for select
  const [arrayLoc, setArray] = React.useState(['Germany','Canada','United States','Australia']);
  const [houseArray, sethouseArray] = React.useState(['house', 'appartment']);
  // options for select
  
  // handles location filter
  const handleLoc = (value) => {
    setLoc(value);
  };
  // handles location filter
  const handleHouse = (value) => {
    setType(value);
  };

  // const handleLoc = (value) => setLoc(value);

  // filters data
  function filterData() { 
    // checking country
    var res = Data;
    res = loc === "" ? res : res.filter(data => data.country === loc)
    
    // checking housetype
    res = houseType === "" ? res : res.filter(data => data.house === houseType)
    
    // checking upper range 
    res = PriceRange[1] === "" ? res : res.filter(data => data.price <= PriceRange[1])
    
    // checking Lower range 
    res = PriceRange[0] === "" ? res : res.filter(data => data.price >= PriceRange[0])
    
    // sorts acc to price also
    res.sort((a, b) => {
      return a.price - b.price;
    });
    return res;
  }

  // seperating popular estate and !popular estate
  const popular= filterData().filter(data => data.popularity)
  const normalData = filterData().filter(data => !data.popularity)

  return (
    <div className={`container`}>
      <div className={`navBar`}>
        <div className="company">
          <RiHomeSmile2Fill style={{color:'rgba(113, 62, 243, 0.721)',fontSize:'1.5em',marginRight:'3px'}} />
          Estatery
          <div className="nav-elements">
          <ul>
            <li className="Rent_nav">Rent</li>
            <li>Buy</li>
            <li>Sell</li>
            <li className="Manage_nav">
            <span>Manage Property</span>
            <MdExpandMore/>
            </li>
            <li>
            <span>Resources</span>
            <MdExpandMore/>
            </li>
          </ul>
        </div>
        </div>
        
        
        <div className="login_nav">
          <button className="log_button">
            Login
          </button>
        </div>
        <div className="sign_nav">
          <button className="signup_button">
            Sign up
          </button>
        </div>
      </div>
      <div className="landing">
        <div className="landingText">
          Search properties to rent
        </div>
        <div className="dropdown-container">
          <Select className="searchtext"
              placeholder = "Search with SearchBar"
          />
          </div>
      </div>

      <div className={`filter`}>

        <Filter
          value={loc}
          handleChange={handleLoc}
          list={arrayLoc} place={"Location"}
          symbol={<ImLocation2 style={{ color: 'rgba(113, 62, 243, 0.721)', marginRight: '5px' }} />}
        />

        <div style={{width:'1px',height:'8vh',background:'rgb(35,35,35,0.2)'}}></div>

        <Filter
          value={houseType}
          handleChange={handleHouse}
          list={houseArray}
          place={"House Type"}
          symbol={<BsHouseFill style={{ color: 'rgba(113, 62, 243, 0.721)',marginRight:'5px'}} />}
        />

        <div style={{width:'1px',height:'8vh',background:'rgb(35,35,35,0.2)'}}></div>

        <DatePickerComponent
          value={Dateobj}
          seenValue={seenDate}
          onDateChange={onDateChange}
        />
        
        <div style={{width:'0.5px',height:'8vh',background:'rgb(35,35,35,0.2)'}}></div>
        
        <RangeSlider
          value={PriceRange}
          handleChange={handlePriceChange}
        />
        <button className="search_button">
          Search
        </button>
      </div>
      <div className={`searchResult`}>
        {popular.map((data => <Card obj = {data}/>))}
        {normalData.map((data => <Card obj = {data}/>))}
        
      </div>

    </div>
  )
}
