const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: './config.env',
});

// const DB = process.env.DATABASE;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
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

const app = require('./app');

// console.log(process.env);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});
