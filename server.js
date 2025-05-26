/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
const dotenv = require('dotenv');
const app = require('./app');
const mongooes = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<USERNAME>',
  process.env.DATABASE_USERNAME,
).replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongooes
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.error('DB connection error:', err));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
