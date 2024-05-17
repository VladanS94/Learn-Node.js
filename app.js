const express = require('express');

const app = express();

app.get('/', (req, res) =>{
    res.status(200).json({
        name: 'Vladan',
        lastname: 'Stojic',
        app: 'Natours',
        message:'Hello from the server side!'
    });
});

app.post('/', (req, res) =>{
    res.send('You can post to this endpoint...')
});

const port = 3000;
app.listen(port, () => {
    console.log(`App runing on port ${port}...`);
});
