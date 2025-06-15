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
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥');
  console.log(`Error name: ${err.name}`);
  console.log(`Error message: ${err.message}`);
  console.log('Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log(`Error name: ${err.name}`);
  console.log(`Error message: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

//DB Fix Provided By Another User In Earlier Lesson - Disabling For Testing Errors

// Connect to MongoDB
//const DB = process.env.DATABASE.replace(
//  '<PASSWORD>',
//  process.env.DATABASE_PASSWORD
//);
//
//async function dbConnect() {
//  await mongoose.connect(DB);
//  //console.log(mongoose.connections);
//}
//dbConnect().catch(err => console.log(err));

//Original Code in lesson for DB connection

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );

// //Connect To DB without Find And Modify and Create Index to avoid error in newer Mongoose
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     //useCreateIndex: true,
//     // useFindAndModify: false,
//   })
//   .then(() => console.log('DB connection successful!'));

// //Server Launch On Port 3000
// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

// //Global Error Handling For Server
// process.on('unhandledRejection', (err) => {
//   console.log(`this is error name : ${err.name}......`, err.message);
//   console.log('Unhandled Rejection 💥. Shutting down!');
//   // server.close(() => process.exit(1));
// });
