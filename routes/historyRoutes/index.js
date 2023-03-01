const routes = require("express").Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { History } = require("../../models");
const { Users,Consultants} = require("../../functions/associations/historyAssociations");


routes.get("/getMailHistory", async (req, res) => {
    try{
        const offset = parseInt(req.headers.offset)||0;
        const limit = parseInt(req.headers.limit)||10;        
        const sort = parseInt(req.headers.filter)||'';        
           
        const mailHistory = await History.findAndCountAll({
          offset:offset,
          limit:10,
          include:[
            {model:Users},
            {model:Consultants}
          ],
        });

        // const ConsultantsInfo = await Consultants.findAll({
        //   where:{
        //     category:{[Op.substring]: `%${req.headers.category.toLowerCase().toUpperCase()}%`},
        //     name:{[Op.substring]: `%${req.headers.name.toLowerCase().toUpperCase()}%`},
        //     email:{[Op.substring]: `%${req.headers.email.toLowerCase().toUpperCase()}%`},
        //     security_clearence:{[Op.substring]: `%${req.headers.sc.toLowerCase().toUpperCase()}%`},
        //   }
        // }); 

        const results = {};
      
        results.next = {
          offset: offset + 1,
          limit: 10,
        };
        results.previous = {
          offset: offset - 1,
          limit: limit,
        };
        
        results.total = mailHistory.count;
        
        results.mailHistory = mailHistory.rows
      
        if (mailHistory === null) {
          console.log('Not found!');
        } else {
          res.send([results]); // true
        }

      } catch(e){
        console.log(e)
      }
  });
  
routes.delete("/deleteHistory", async (req, res) => {
    try {
        const id = req.headers.id
        const deleteHistory = await History.destroy({where: { id:`${id}`},force: true})
        res.sendStatus(200)
    } catch (error) {

    }
});


module.exports = routes;
