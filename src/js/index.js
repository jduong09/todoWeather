import "../css/meyers_reset.css";
import "../css/style.css";

document.addEventListener('DOMContentLoaded', () => {
  const btnSubmit = document.getElementById('btn-submit');

  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const inputSearch = document.getElementById('search').value;
    // run search for weather api. 
    fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${inputSearch}`, {
      method: 'GET',  
      mode: 'cors'
    }).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      populateDOM(json);
    }).catch(error => {
      console.log(error);
    });
  });
});

/*
   "location": {
                    "name": "Boston",
                    "region": "Lincolnshire",
                    "country": "United Kingdom",
                    "lat": 53.0,
                    "lon": -0.12,
                    "tz_id": "Europe/London",
                    "localtime_epoch": 1673620218,
                    "localtime": "2023-01-13 14:30"
                },
                "current": {
                    "last_updated_epoch": 1673620200,
                    "last_updated": "2023-01-13 14:30",
                    "temp_c": 8.7,
                    "temp_f": 47.7,
                    "is_day": 1,
                    "condition": {
                        "text": "Partly cloudy",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                        "code": 1003
                    },
                    "wind_mph": 24.2,
                    "wind_kph": 38.9,
                    "wind_degree": 260,
                    "wind_dir": "W",
                    "pressure_mb": 1005.0,
                    "pressure_in": 29.68,
                    "precip_mm": 0.0,
                    "precip_in": 0.0,
                    "humidity": 74,
                    "cloud": 75,
                    "feelslike_c": 4.4,
                    "feelslike_f": 39.9,
                    "vis_km": 10.0,
                    "vis_miles": 6.0,
                    "uv": 2.0,
                    "gust_mph": 33.1,
                    "gust_kph": 53.3
                }
*/

const populateDOM = (obj) => {
  /* 
  <div>
    <h2>Location</h2>
    <span>LocalTime</span>

    <div>
      <img class=icon-condition> src="" />
      <h3>Partly Cloudy</h3>
      <span>Temperature F</span>
    </div>


    <div>
      <ul>
        <li>Humidity: </li>
        <li>wind mph: </li>
        <li>feels like: </li>
      </ul>
    </div>
  </div>
  */

  const divWeather = document.getElementById('div-weather');

  let divLocation = document.createElement('div');
  let locationHeader = document.createElement('h3');
  locationHeader.innerHTML = `${obj.location.name}, ${obj.location.region}`;

  let localTime = document.createElement('span');
  localTime.innerHTML = obj.location.localtime;

  divLocation.append(locationHeader, localTime);

  let divCondition = document.createElement('div');
  let imgCondition = document.createElement('img');
  imgCondition.classList.add('icon-condition');
  imgCondition.src = `https:${obj.current.condition.icon}`;
  imgCondition.alt = `Icon displaying ${obj.current.condition.text} weather condition`;

  let headerCondition = document.createElement('h2');
  headerCondition.innerHTML = obj.current.condition.text;

  let currentTemp = document.createElement('span');
  currentTemp.id = 'span-temp';
  currentTemp.innerHTML = `${obj.current.temp_f}&#8457`;

  divCondition.append(imgCondition, headerCondition, currentTemp);

  let divRelevantInfo = document.createElement('div');
  let ulInfo = document.createElement('ul');
  ulInfo.id = 'list-extras';
  let itemHumidity = document.createElement('li');
  itemHumidity.innerHTML = `
    <h4>Humidity</h4>
    <span>${obj.current.humidity}%</span>`;
  let itemWindMph = document.createElement('li');
  itemWindMph.innerHTML = `
    <h4>Wind MPH</h4>
    <span>${obj.current.wind_mph}mph</span>`;
  let itemFeelsLike = document.createElement('li');
  itemFeelsLike.innerHTML = `
    <h4>Feels Like</h4>
    <span>${obj.current.feelslike_f}&#8457</span>`;
  ulInfo.append(itemHumidity, itemWindMph, itemFeelsLike);
  divRelevantInfo.appendChild(ulInfo);

  divWeather.innerHTML = '';
  divWeather.append(divLocation, divCondition, divRelevantInfo);
};