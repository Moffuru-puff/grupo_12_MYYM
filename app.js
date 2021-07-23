let express = require('express');
let path = require('path');
let app = express();
let port = 3000;

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Puerto corriendo en ${port}\n http://localhost:${port}`)
})