const mongoose = require('mongoose');

mongoose.connect('your-mongodb-atlas-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
