/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51Ra7XgIdEbC4uGKZhcsAI31JLKZANtqZGta52OGxkJF9iB1Nob3vRF9GF4LVgn2UfkK59YVK2hslmJ0kQLjQfMew00iHc40tIk',
);
export const bookTour = async (tourId) => {
  try {
    // get session from the server,
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2) create checkout form +charge the card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
