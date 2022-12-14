const routes = require("express").Router();
const { Users } = require("../../models");

routes.post("/createUser", (req, res) => {
  // using same variable name as used in frontend
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  // we set if else statement to check if email exists or not or the space is empty
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

module.exports = routes;
