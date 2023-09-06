const weatherForm = document.querySelector('form');
const m1 = document.querySelector('#location');
const m2 = document.querySelector('#weather');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  m1.textContent = 'Loading... beep beep-boop boop';
  m2.textContent = '';
  try {
    const inputValue = document.querySelector('#city').value;
    const res = await fetch(`http://localhost:3001/weather?search=${inputValue}`);

    const weather = await res.json();
    console.log(weather);
    m1.textContent = `In ${weather.location} it is currently:`;
    m2.textContent = `${weather.weather} and ${weather.temp} degrees`;

  } catch (err) {
    m1.textContent = 'Please input a city name';
    m2.textContent = '';
  }

});