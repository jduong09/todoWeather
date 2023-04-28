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
      populateDOM(json);
    }).catch(error => {
      console.log(error);
    });
  });
});

const populateDOM = (obj) => {

};