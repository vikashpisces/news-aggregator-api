const express = require('express');
const bodyParser = require('body-parser');
const { verifyToken } = require('./middlewares/authMiddleWare');
const { default: mongoose } = require('mongoose');

require('dotenv').config()

const PORT = process.env.PORT || 3000

// Mongo DB Connection
try {
  mongoose.connect(process.env.MONGODB_CONNECTION + '/' + 'newsAggregatorDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  console.log('Connected to MongoDB successfully');
} catch (error) {
  console.log('Error connecting to MongoDB:', error);
}

const app = express()
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to News Aggregator API!!!')
})


app.use('/user', require('./routes/userRoutes'));
app.use('/preferences', verifyToken, require('./routes/preferenceRoutes'))
app.use('/news', verifyToken, require('./routes/newsRoutes.js'))


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

module.exports = app