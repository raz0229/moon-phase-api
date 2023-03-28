const express = require('express')
const bodyParser = require('body-parser');
const { getMoonPhase } = require('./data/index.cjs');
const cors = require('cors');

const app = express();
const port = 3000;

// const allowedOrigins = ['https://marvelapp.com'];
// const options = {
//   origin: allowedOrigins
// };

// app.use(cors(options));
app.use(cors())

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getMoonPhase', async (req, res) => {

    const response = await getMoonPhase();
    
    res.json(response);
});

app.get('*', (req, res) => {
    res.status(404).send('No Mooning here');
});

app.listen(port, () => console.log(`Moon Phase app listening on port ${port}!`));