const routeNotFound = (err,req, res, next) => {
     const statusCode = req.statusCode === 404;
     if (statusCode) {
          res.status(404).json({ message: 'Route not found' });
     } else {
          next(err);
     }
};


const idNotValide = (err, req, res, next) => {
     const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
     res.status(statusCode).json({ message: err.message });
};


module.exports = {
  routeNotFound,
  idNotValide
};
