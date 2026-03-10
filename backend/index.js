const express = require('express');

const app = express();
app.use(express.json());

const requestsRoutes = require('./src/routes/request.route');
app.use('/requests', requestsRoutes);
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);    
});