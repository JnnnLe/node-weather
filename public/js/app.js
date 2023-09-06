const weatherForm = document.querySelector('form');
const m1 = document.querySelector('#location');
const m2 = document.querySelector('#weather');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  m1.textContent = 'Loading... beep beep-boop boop';
  m2.textContent = '';
  try {
    const inputValue = document.querySelector('#city').value;
    const res = await fetch(`http://api.weatherstack.com/current?access_key=ce8e850a26092946a008066840002c71&query=${inputValue}&units=f`);
    const weather = await res.json();
    console.log(weather);
  } catch (err) {
    m1.textContent = 'Please input a city name';
    m2.textContent = '';
  }

});