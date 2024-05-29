const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
});

app.use((req, res, next) => {
    req.requstTime = new Date().toISOString();
    next()
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


const getAllTours = (req, res) => {
    console.log(req.requstTime);
        res
        .status(200)
        .json({
            status: 'succes',
            requestedAt: req.requstTime,
            data: {
                tours
            }
        }) 
}

const getTour = (req, res) => {

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    // if(id > tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })
    }

    res
    .status(200)
    .json({
        status: 'succes',
        data: {
            tour
        }
    })
}

const createTour = (req, res) => {

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id:newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours), 
    err => {
        res.status(201).json({
            status: 'succes',
            data: {
                tour: newTour
            }
        })
    })
}

const updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'succes',
        data: {
            tour: 'Updated tour'
        }
    })
}

const deleteTour = (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'succes',
        data: null
    })
}

// READ METHOD
// app.get('/api/v1/tours', getAllTours);

// READ METHOD
// app.get('/api/v1/tours/:id', getTour);

// POST METHOD
// app.post('/api/v1/tours', createTour);

// UPDATE METHOD
// app.patch('/api/v1/tours/:id', updateTour);

// DELETE METHOD
// app.delete('/api/v1/tours/:id', deleteTour);

// BETTER CODE FOR GET AND POST METHOD
app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

// BETTER CODE FOR GET, PATCH AND DELETE METHOD
app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

const port = 3000;
app.listen(port, () => {
    console.log(`App runing on port ${port}...`);
});

