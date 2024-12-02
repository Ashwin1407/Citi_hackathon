import React, { useState,useEffect} from "react";
import {categories,professions,merchants,city ,states} from "./filterOptionslessdata";
import {getCharturl, getFilters} from './scripts';
import Table from './Table';
import Charts from './Charts';
import 'bootstrap/dist/css/bootstrap.css';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import '../styles.css';
import '../filter.css';
import CircularProgress from "@mui/material/CircularProgress";
import { filledInputClasses } from "@mui/material";


function Filters() {
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState({});
  const [chartdata, setChartdata]=useState({});
  const [transaction, setTransaction] = useState({
    pageno: "0",
    pagesize: "10",
    gender: "null",
    category: "null",
    merchant: "null",
    city: "null",
    state: "null",
    lower: "",
    upper: "",
    profession: "null",
  });
  const fetchData = async () => {
    console.log("fetch data");
    const url = getFilters(transaction);
    try {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => setResponse(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("use effect data");
    fetchData();
  }, [transaction.pageno]);

  const handleSubmit = async (event) => {
    console.log("handle submit data");
    event.preventDefault();
    const url = getFilters(transaction);
    const charturl = getCharturl(transaction);
    setLoader(true);
    console.log(charturl);
    setTransaction((prevData) => ({
      ...prevData,
      pageno:"0",
    }));
    try {
      console.log(transaction);
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => setResponse(data));
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      await fetch(charturl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setChartdata(data)
        setLoader(false)});
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handlePrev = () => {
    console.log("prev");
    const temp = parseInt(transaction.pageno);
    if (temp !== 0) {
      setTransaction((prevData) => ({
        ...prevData,
        pageno: (temp - 1).toString(),
      }));
    }
  };
  const handleNext = () => {
    console.log("next");
    const temp = parseInt(transaction.pageno);
    setTransaction((prevData) => ({
      ...prevData,
      pageno: (temp + 1).toString(),
    }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setTransaction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div id="body">
      <div id="filters">
        <div class="filterDivs" id="pagesdiv">
          <p>Show</p>
          <input
            name="pagesize"
            id="pagesize"
            type="number"
            value={transaction.pagesize}
            onChange={handleChange}
          ></input>
          <p>entries</p>
        </div>
        <div class="filterDivs" id="genderdiv">
          <p>Gender</p>
          <select name="gender" onChange={handleChange} id="gender">
            <option value="null">None</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div class="filterDivs" id="categorydiv">
          <p>Category</p>
          <select name="category" onChange={handleChange} id="category">
            <option value="null">None</option>
            {categories.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div class="filterDivs" id="merchantdiv">
          <p>Merchant</p>
          <select name="merchant" onChange={handleChange} id="merchant">
            <option value="null">None</option>
            {merchants.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div class="filterDivs" id="statediv">
          <p>State</p>
          <select name="state" onChange={handleChange} id="state">
            <option value="null">None</option>
            {states.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div class="filterDivs" id="citydiv">
          <p>City</p>
          <select name="city" onChange={handleChange} id="city">
            <option value="null">None</option>
            {city.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div class="filterDivs" id="professiondiv">
          <p>Profession</p>
          <select name="profession" onChange={handleChange} id="profession">
            <option value="null">None</option>
            {professions.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div class="filterDivs" id="limitdiv">
          <p>Limit</p>
          <input
            name="lower"
            type="number"
            placeholder="Lower limit"
            value={transaction.lower}
            onChange={handleChange}
            id="lower"
          ></input>
          <input
            name="upper"
            type="number"
            placeholder="Upper limit"
            value={transaction.upper}
            onChange={handleChange}
            id="upper"
          ></input>
        </div>
        <button id="search" onClick={handleSubmit} class="btn btn-outline-primary">
          Search
        </button>
      </div>
      <Table transactions={response} />
      <div id="pageNav">
        <button onClick={handlePrev}><SkipPreviousIcon fontSize="large"/></button>
        <h5 id="pageNo">{parseInt(transaction.pageno) + 1}</h5>
        <button onClick={handleNext}><SkipNextIcon fontSize="large"/></button>
      </div>
      {loader && (
        <div>
          <br></br>
          <CircularProgress />
        </div>
      )}
      {!loader &&
      <Charts data={chartdata}/>
}
    </div>
  );
}

export default Filters;
