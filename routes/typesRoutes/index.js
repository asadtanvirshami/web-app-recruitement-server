const routes = require("express").Router();
const { Types } = require("../../models");

routes.post("/setoptions", async (req, res) => {
    console.log(req.body)
    try {
     const Res = await Types.create({
    cities:`${[req.body.name]}`
    },{where:{ id: `${id}` }})
      res.send({message:"Success"})
    } catch (error) {
      console.log(); 
      res.send(error);
    }
  });

routes.post("/updateoptions", async (req, res) => {
    console.log(req.body)
    const type = req.body.type
    try {   
      if(type=='categories'){
     const Res = await Types.update({categories:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='cities'){
     const Res = await Types.update({cities:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='resources'){
     const Res = await Types.update({resources:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='sources'){
     const Res = await Types.update({sources:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='experiences'){
     const Res = await Types.update({experiences:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='security_clearences'){
     const Res = await Types.update({security_clearences:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
      if(type=='regions'){
     const Res = await Types.update({regions:`${[req.body.name]}`},{where:{ id: 'ebda68b0-e147-4f15-ba74-0f421d895e76'}})
      res.status.send(200)
      }
    } catch (error) {
      console.log(); 
      res.send(error);
    }
  });
  
routes.get("/getoptions", async (req, res) => {
    console.log(req.body)
    try {
     const Res = await Types.findAll()
      res.send(Res)
    } catch (error) {
      console.log(); 
      res.send(error);
    }
  });


module.exports = routes;
