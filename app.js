const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/api');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
