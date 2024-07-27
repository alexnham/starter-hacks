const express = require('express');
const cors = require('cors'); // Require CORS package
const app = express();
const port = 3000;

app.get('/yup', async (req, res) => {
    try {
     res.send("yup")
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
});

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});

