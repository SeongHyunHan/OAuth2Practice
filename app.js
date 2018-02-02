const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const authRoutes = require('./routes/auth-route');
const profileRoutes = require('./routes/profile-route');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();
const port = process.env.PORT || 3000;

// set up view engine
app.set('view engine', 'ejs');

// intialize cookie session
app.use(cookieSession({
    maxAge: 24* 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, (req, res) => {
    console.log('Connected to Mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

app.listen(port, () => {
    console.log("App now listening for requests on port 3000");
})