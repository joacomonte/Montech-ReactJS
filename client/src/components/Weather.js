import React, { useState} from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'


const geoApiOptions = 
{
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '68fe517f74msh39a3ac3397d753ap1acac7jsn1f9381ec7d88',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};
const geoApiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo'


const openWeatherApiUrl = 'https://api.openweathermap.org/data/2.5'

const openWeatherApiKey = 'd367692ec061efede6349a8069ea8b1f'





const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted light grey',
    color: state.isFocused ? 'black' : 'white',
    padding: 20,
    backgroundColor: state.isFocused? 'white':'rgba(28, 28, 28, 0.954)',
  }),
    menuList: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(28, 28, 28, 0.954)',

  }),
};







const Weather = ()  => {

  //from inputed value -> fetch -> return object {options: {value:,label:}}
  const cityOptionsFunction = (inputValue) => {
    return fetch(`${geoApiUrl}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
        .then(response => response.json())
        .then(response => {
          return{
            options: response.data.map((city)=> {
              return{              
                value: `${city.latitude},${city.longitude}`,
                label: `${city.name}, ${city.region}, ${city.country} `
              }
            })
          }
        })
      .catch((err) => console.error(err));
  }

  const [currentWeather, setCurrentWeather] = useState(null);

  const[search, setSearch] = useState(null);


  //gets the "object city" from "cityOptionsFunction" and fetchs with its values
  const citySelectedFunction = (citySelected) =>{
    setSearch(citySelected);


    const [lat, lon] = citySelected.value.split(",");

    fetch(`${openWeatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`)
      .then(res => res.json())
      .then(json => {
        setCurrentWeather({city: citySelected.label, ...json});
      })
      .catch((err) => console.log(err) );
  }


// 


  return(

    <div className="forecast-container">

      <div className="forecast-title">
        <h4>Temperatura en {currentWeather ? currentWeather.city.split(',')[0] : "algun lugar del mundo es de 20º"}: {currentWeather && Math.round(currentWeather.main.temp)+'º'}</h4>
      </div>

        <div className="forecast-Searcher">
          <AsyncPaginate 
            placeholder="Buscar por ciudad"
            debounceTimeout={1200} // delay to fetch
            value={search} // to print letters
            loadOptions={cityOptionsFunction} // to fetch the objects cities
            onChange={citySelectedFunction} // cityObject selected
            styles={colourStyles}
          />
        </div>
        
    </div>
)}


export default Weather;