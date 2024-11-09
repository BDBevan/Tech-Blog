// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Update import here
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const routes = require('./routes'); // Import your routes
const { sequelize } = require('./models'); // Import the sequelize instance from your models
const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars setup
const hbs = exphbs.create({ /* config options */ });
app.engine('handlebars', hbs.engine); // Initialize Handlebars engine
app.set('view engine', 'handlebars');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.use(methodOverride('_method'));

// Session setup
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } 
}));

// Pass session data to all views
app.use((req, res, next) => {
  res.locals.session = req.session; 
  next();
});

// Use routes
app.use(routes);

// Sync sequelize and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
