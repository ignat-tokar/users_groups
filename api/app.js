const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const PORT = config.get('port');

app.use(express.json({ extended: true }));
app.use('/api/groups', require('./routes/groups.routes'));
app.use('/api/users', require('./routes/users.routes'));

async function start(){
  try {

    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));

  } catch (error) {
    console.log('Server error: ', error);
    process.exit(1);
  }
}
start();