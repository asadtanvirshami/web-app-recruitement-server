const routes = require("express").Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { History } = require("../../models");
const { Users,Consultants} = require("../../functions/associations/historyAssociations");

routes.get("/getMailHistory", async (req, res) => {
    try{
        const offset = parseInt(req.headers.offset)||0;
        const limit = parseInt(req.headers.limit)||10;        
        
        const mailHistory = await History.findAndCountAll({
          where:{
            sent_day:{[Op.substring]: `%${req.headers.sent_day||''}%`},
            sent_date:{[Op.substring]: `%${req.headers.sent_date||''}%`},
          },
          offset:offset,
          limit:10,
          include:[
            {model:Users},
            {model:Consultants}
          ],
        });

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
        res.status(200).send(deleteHistory)
    } catch (error) {

    }
});

module.exports = routes;
