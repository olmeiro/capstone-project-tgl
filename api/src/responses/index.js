exports.successResponse = function (req, res, body, status) {
    res.status(status || 200).json({ body })
}

exports.errorResponse = function (req, res, error, status) {
    res.status(status || 500).json({ error })
}