const express = require('express')
const app = express()



app.get('/', (req, res) => {
    res.send("hallo");
});
const port = 3011
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});