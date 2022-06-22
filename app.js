const express = require('express')
const app = express()


const port = 3011

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,"temp/index.html"));
});



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});