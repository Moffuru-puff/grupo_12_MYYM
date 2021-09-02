const { getUsers, writeJsonUsers } = require('../db/dataB')
const { validationResult } = require('express-validator')

module.exports = {
    login: (req, res) => {
      res.render("users/login")
    },
    register: (req, res) => {
      res.render("users/register")

    },
    registerNewUser: (req, res) => {

      let errors = validationResult(req)

      console.log(req.body)
   

      if(errors.isEmpty()){
     
        let lastId = 1;

         getUsers.forEach(user => {
            if(user.id > lastId){
                lastId = user.id
            }
        })  

      let {
          user,
          email,
          password,
          repassword
          } = req.body;

          

      let newUser = {
          id: lastId + 1,
          user: `${user}`,
          email: `${email}`,
          password: `${password}`,
          rol: "normal",
          image: "defaultAvatarImage.png"
      };

      getUsers.push(newUser);

      writeJsonUsers(getUsers)

      res.redirect('/')
  } else {
      res.render("users/register", {
          errors: errors.mapped(),
          old: req.body
      })
  }

    },
  };