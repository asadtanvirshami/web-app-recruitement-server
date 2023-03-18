const routes = require("express").Router();
const { Users } = require("../../models");

routes.post("/createUser", (req, res) => {

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  try {
    Users.findOrCreate({
      where: { email: `${email}` },
      defaults: {
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        email: `${email}`,
        password: `${password}`
      },
    }).then(([created]) => {
        if (created === false) {
            res.send({message:"Failed"})
        } else {
            res.send({ message: "Success" })
        }
    })
  } catch (error) {
    console.log(); // fields contains extra meta data about results, if available
    res.send(error);
  }
});

routes.post("/updateUser", async (req, res) => {
  // using same variable name as used in frontend
  const id = req.body.id
  const email = req.body.email;
  const password= req.body.password
  const type= req.body.type

  try {
    if(type=='email'){
    const UpdateEmail = await Users.update({email: `${email}`,}, 
    {where:{ id: `${id}` }});
    res.status.send(200)
    }
    if(type=='password'){
    const UpdatePassword = await Users.update({password: `${password}`,}, 
    {where:{ id: `${id}` }});
    res.status.send(200)   
    }
  } catch (error) {
    console.log(); 
    res.send(error);
  }
});

module.exports = routes;
