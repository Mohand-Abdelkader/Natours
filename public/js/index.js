/* eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login.js';
import { displayMap } from './leaflet.js';
import { updateSettings } from './updateSettings.js';
import { bookTour } from './stripe.js';
//DOM Elements
const mapContainer = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateUserForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');
// values

if (true) {
  console.log('test');
}
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

if (updateUserForm) {
  updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (passwordForm) {
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save--password').textContent = 'Updating....';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.querySelector('.btn--save--password').textContent =
      'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    console.log('click');
    e.target.textContent = 'Processing';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
