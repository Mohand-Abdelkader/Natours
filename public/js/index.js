/* eslint-disable*/
import '@babel/polyfill';
import { login } from './login.js';
import { displayMap } from './leaflet.js';

//DOM Elements
const mapContainer = document.getElementById('map');
const loginForm = document.querySelector('.form');
// values

//Delegation
if (mapContainer) {
  const locations = JSON.parse(mapContainer.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}
