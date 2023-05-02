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
      mode: 'cors',
      
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

const populateDOM = (obj) => {
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

  if (divWeather.classList.contains('hide')) {
    divWeather.classList.remove('hide');
  }
};