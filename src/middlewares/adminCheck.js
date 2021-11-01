module.exports = (req, res, next) => {
    if(req.session.user && req.session.user.rolesId == 2 ){
      next()
    }else{
        res.redirect('/')
    }
}