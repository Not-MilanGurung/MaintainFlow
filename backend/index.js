const express = require('express');
const config = require('./src/configs/config');
const db = require('./src/configs/db');

const app = express();
app.use(express.json());

db.connect();

app.listen(config.PORT, () => {
    console.log(`Server is running on port http://localhost:${config.PORT}`);    
});