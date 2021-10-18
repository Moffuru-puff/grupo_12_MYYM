module.exports = function (req, res, next) {
    if(req.cookies.userMyymGamers){
        req.session.user = req.cookies.userMyymGamers;
        res.locals.user.user = req.session.user
    }
    next()
}