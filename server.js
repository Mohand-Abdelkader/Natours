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

const tourSchema = new mongooes.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongooes.model('Tour', tourSchema);
const tourTest = new Tour({
  name: 'The Forest Tour',
  rating: 4.7,
  price: 200,
});

tourTest
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err.message));
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
