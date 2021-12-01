const db = require("../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  produc: (req, res) => {

    db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          association: "productimage"
        },
        {
          association: "Mark"
        },
        {
          association: "Subcategorie"
        },
        {
            association: "Valorationproduct"
           
        }
      ],
    })
      .then((product) => {
        db.Product.findAll({
          where: {
            subcategoryId: product.subcategoryId,
          },
          include: [
            {
              association: "productimage",
            },
          ],
        }).then((products) => {
          res.render("./products/detalleDelProducto", {

            product,
            toThousand,
            sliderTitle: "Productos relacionados",
            sliderProducts: products,


            userInSession: req.session.user ? req.session.user : ''
          })
        })
          .catch(error => console.log(error))

      })
  },
  valorationProduct:(req,res)=>{
    let {opinions,rating}= req.body
    
    db.User.findOne({ where:{id:+req.session.user.id}})
    .then(user =>{ 
      db.Product.findOne({
        where:{id:+req.params.id},
        include: [
          {
            association: "productimage"
          },
          {
            association: "Mark"
          },
          {
            association: "Subcategorie"
          },
          {
            association: "Valorationproduct"
          }
        ],
      }).then(product => {
        db.Valorationproduct.create({
          opinions: opinions? opinions : " ",
          score:rating,
          userId: user.id,
          productId:product.id
        }).then(valorationProduct => {
          res.redirect(`/detalleDelProducto/${product.id}`
          
         
           
          )
        })
  

      })
    })
   
  }
};



