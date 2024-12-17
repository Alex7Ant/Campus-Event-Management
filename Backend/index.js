const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5502;
const { Pool } = require('pg');
require('dotenv').config();


module.exports = {
  query: (text, params) => pool.query(text, params),
};

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

db.pool.connect()
  .then(() => console.log("Database connected successfully"))
  .catch(err => {
    console.error("Database connection error:", err.stack);
    process.exit(1);
  });


  async function testConnection() {
    try {
      const client = await pool.connect();
      console.log('Database connection successful');
      client.release();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  testConnection();
  
  module.exports = Pool;


const authRoutes = require('./api/auth');
const eventRoutes = require('./api/eventListing');
const registerRoutes = require('./api/registration');
const loginRoutes = require('./api/login');
const calendarRoutes = require('./api/calendar');
const aboutRoutes = require('./api/aboutsection');

app.use('/api/auth', authRoutes);
/*app.use('/api/eventListing.js', eventRoutes)
app.use('/api/registration.js', registerRoutes)
app.use('/api/login.js', loginRoutes)
app.use('/api/calendar.js', calendarRoutes)
app.use('/api/aboutsection.js', aboutRoutes)*/

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



