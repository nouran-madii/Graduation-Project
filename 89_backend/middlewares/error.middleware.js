const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err }

        error.message = err.message;
        console.error(err)

        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        //mongoose validation error
        if (err.name === 'ValidationError') {
            const message  = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Something went wrong!',
        })
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;