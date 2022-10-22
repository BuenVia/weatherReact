import React, { useState } from "react";
import axios from 'axios'

export default function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=1b4285cacb852ff76f4aa122cc7bc8d1`;

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
      })
      setLocation('')
    }
  }

  return (
    <div className="bg">
      <div className="app">
      <div className="search">
        <input 
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter a location'
          type='text'
        />
      </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.main !== undefined &&
            <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed.toFixed()} KMH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
          }


        </div>
      </div>
    </div>
  );
}
