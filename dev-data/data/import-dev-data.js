const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({
  path: './config.env',
});

// const DB = process.env.DATABASE;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful');
  });

// IMPORT DATA
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data loaded succesfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE DATA
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
