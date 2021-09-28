//commonjs syntax
const express = require('express');
const { appendFile } = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members');

const logger = require('./middleware/logger');

const app = express();

//init middleware
// app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members,
  })
);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

//method to listen on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
