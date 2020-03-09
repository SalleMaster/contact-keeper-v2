const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    }
  })
);

// init Middleware - To Able To Read: req.body
app.use(express.json({ extended: false }));

//add other middleware
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) =>
  res.json({
    msg: 'Welcome to The Contact Keeper API'
  })
);

//make uploads directory static
app.use('/uploads', express.static('uploads'));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gallery', require('./routes/gallery'));
// app.use('/upload-avatar', require('./routes/avatar'));
// app.use('/upload-photos', require('./routes/photos'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
