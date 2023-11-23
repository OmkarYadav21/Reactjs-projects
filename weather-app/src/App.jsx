import { useState,useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const[data,setData]=useState([]);
  const[data1,setData1]=useState([]);

  const getWeatherData=async(location)=>{
    let currentDate = new Date().toJSON().slice(0, 19);
    console.log(currentDate);
    try {
      const result=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${currentDate}?key=YZGQNRFQ3UB67ZSZRSLCLTG84&include=current`);
      const actualData=await result.json();
      // const { days } = actualData.data1;
      console.log(actualData);
      // const reg=days[0];
       setData(actualData);
       setData1(actualData.days[0]);   
    } catch (error) {
      console.log(error);
    }
  }

const onHandleClick=()=>{
  const location =document.getElementById("location").value;
  getWeatherData(location);

}
  return (
    <>
      <div>
        <h1>WeatherNow</h1>
        <input type="text" id="location" placeholder="Enter location" />
        <button id="search" onClick={onHandleClick}>Search</button>
      </div>

      <div id="current-weather">
        <h2 id="location-name">{data.resolvedAddress ||"City, State"}, {data.timezone || "Country"}</h2>
        <div id="temperature">{data1.temp || "0.0"}°C</div>
        <div id="weather-condition">{data1.conditions}</div>
        <img id="weather-icon" src="./icon.png" alt="Weather Icon" />
        <div id="additional-info">
          <span>Wind Speed:</span> {data1.windspeed || "0.0"} km/h
          <br />
          <span>Humidity:</span> {data1.humidity || "0.0"} %
          <br />
          <span>Sunrise:</span> {data1.sunrise || "0.0"}
          <br />
          <span>Sunset:</span> {data1.sunset || "0.0"}
        </div>
      </div>
    </>
  );
}

export default App;
