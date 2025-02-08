const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user');



const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



// Routes
app.get("/", (req, res) => {
    return res.send('IdeaHub');
});
app.use('/api/user', userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
