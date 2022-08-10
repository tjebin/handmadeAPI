const notFound = (req, res, next) => {
    res.status(404).send('testing middleware..............');
    next();
}

module.exports = notFound
