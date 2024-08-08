const Tour = require('./../models/tourModel');

  exports.getAllTours = async (req, res) => {
   
    try {
      // BUILD QUERY
      const queryObj = {...req.query};
      const exludeFields = ['page', 'sort', 'limit', 'fields'];
      exludeFields.forEach(el => delete queryObj[el]);

      const query = Tour.find(queryObj);

      // const query =  Tour.find()
      // .where('duration')
      // .equals(5)
      // .where('difficulty')
      // .equals('easy');

      // EXECUTE QUERY
      const tours = await query;

      //  SEND RESPONSE

      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours
        }
      });
    } catch(err) {
      res.status(404).json({
        status: 'Fail',
        message: err
      })
    }
   
  };

exports.getTour = async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        results: tour.length,
        data: {
          tour
        }
      });
    } catch(err) {
      res.status(404).json({
        status: 'Fail',
        message: err
      })
    }

  };
  
exports.createTour = async (req, res) => {

  try {
    // const newTour = new Tour({})
    // newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'succes',
      data: {
        tour: newTour,
      },
    });
    } catch (err) {
      res.status(404).json({
        status: 'Fail',
        message: "Invalid data sent!"
      })
    }

  };
  
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'succes',
      data: {
        tour
      },
    });

  } catch (err){
    res.status(404).json({
      status: 'Fail',
      message: "Invalid data sent!"
    })
  }
   
  };
  
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'succes',
      data: null,
    });

  } catch (err){
    res.status(404).json({
      status: 'Fail',
      message: "Invalid data sent!"
    })
  }
  };