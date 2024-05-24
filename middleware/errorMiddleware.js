exports.errorHandler = (err, req, res, next) => {
    console.error("yahan ", err.message);
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({ errors });
    }
    next();
};
