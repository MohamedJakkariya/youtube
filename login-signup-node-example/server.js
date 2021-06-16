const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

// * Setup express response and body parser configurations
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));

// * Router Base Files
app.use('/user', require('./routers/user'));

app.get('/verify', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'verify.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// * Default index serving route for unexpected route
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// * Server listening
app.listen(PORT || 4000, () => {
  console.log(`Server running on 4000`);
});
