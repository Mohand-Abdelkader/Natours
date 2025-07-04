/* eslint-disable*/
import axios from 'axios';
import { showAlert, hideAlert } from './alert.js';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'logged in Successfully');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'logged out Successfully');
      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error Logging out, Try again');
  }
};
