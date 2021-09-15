const { getUsers, writeJsonUsers } = require('../db/dataB')
const { validationResult } = require('express-validator')
let bcrypt = require('bcryptjs')

module.exports = {
    profile: (req, res) => {
      let user = getUsers.find(user => user.id === req.session.user.id)
      res.render("users/profile", {
        user,
        session: req.session
    })

    },

    editProfile: (req, res) => {
      let user = getUsers.find(user => user.id === +req.params.id)

      res.render("users/editProfile", {
          user,
          session: req.session
      })
    },
    updateProfile: (req, res) => {
      let errors = validationResult(req)

      if (errors.isEmpty()) {
          let user = getUsers.find(user => user.id === +req.params.id)

          let {
              name,
              lastname,
              telephone,
              address,
              province,
          } = req.body
          
          user.name = name
          user.lastname = lastname
          user.telephone = telephone
          user.address = address
          user.province = province
          user.avatar = req.file ? req.file.filename : user.avatar

          writeJsonUsers(getUsers)

          /* delete user.password */

          req.session.user = user

          res.redirect("/profile")

      }else{
          res.render("users/editProfile", {
              user,
              errors: errors.mapped(),
              old:req.body,
              session: req.session
          })
      }
    },

    login: (req, res) => {
      res.render("users/login", {
        session: req.session
      })
    },
    loginUser: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let user = getUsers.find(user => user.email === req.body.email)

            req.session.user = {
                id: user.id,
                user: user.user,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                avatar: user.avatar,
                rol: user.rol
            }

            if(req.body.recordar){
                res.cookie('userMyymGamers', req.session.user, {expires: new Date(Date.now() + 900000), httpOnly : true})
            }


            res.locals.user = req.session.user

            res.redirect("/")

        } else {
          res.render("users/login", {
             errors: errors.mapped(),
             session: req.session
          })
        }
    },

    register: (req, res) => {
      res.render("users/register")

    },

    registerNewUser: (req, res) => {

      let errors = validationResult(req)

      /* console.log(req.body) */
   

      if(errors.isEmpty()){
     
        let lastId = 0;

         getUsers.forEach(user => {
            if(user.id > lastId){
                lastId = user.id
            }
        })  

      let {
          user,
          email,
          password
          } = req.body;

          

      let newUser = {
          id: lastId + 1,
          user: `${user}`,
          name: "",
          lastname: "",
          telephone: "",
          address: "",
          province: "",
          email: `${email}`,
          password: bcrypt.hashSync(password, 12),
          rol: "1",
          avatar: req.file ? req.file.filename : "defaultAvatarImage.png"
      };

      getUsers.push(newUser);

      writeJsonUsers(getUsers)

      res.redirect('/login')
  } else {
      res.render("users/register", {
          errors: errors.mapped(),
          old: req.body,
          session: req.session
      })
  }

    },
  };