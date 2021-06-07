const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('Connection successfull with DB....');
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    // then we want ot exit with exit code 1
    process.exit(1);
  }
};

/*
const connectDB = async () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connection successfull with DB....'))
    .catch((err) => {
      console.log(err.message);
      // then we want ot exit with exit code 1
      process.exit(1);
    });
};
*/

module.exports = connectDB;
