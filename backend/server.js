const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sequelize = require('./config/db');

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the Next.js frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials like cookies
}));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Database sync and server start
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});




// const express = require('express')
// const app = express()
// const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })