exports.successResponse = function (req, res, body, status) {
    res.status(status || 200).json({ body })
}

exports.errorResponse = function (req, res, error, status) {
    if(error.isBoom){
        const { output } = error;
        res.status(output.statusCode || 500).json(output.payload);
    }
    else{
        res.status(status || 500).json({ error })
    }
}
