const express = require('express');

const authRoutes = require('./routes/auth-route');

const app = express();
const port = process.env.PORT || 3000;

// set up view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log("App now listening for requests on port 3000");
})