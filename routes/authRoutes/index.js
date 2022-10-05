const routes = require("express").Router();
const { Users } = require("../../models");
const jwt = require("jsonwebtoken");

generateAccessToken = (authUser) => {
  return jwt.sign(
    {
      email: authUser.email,
      id: authUser.id,
      firstname: authUser.firstname,
      lastname: authUser.lastname,
    },
    "mysecretkey",
    { expiresIn: "15m" }
  );
};

routes.post("/loginAuth", async function (req, res) {
  // using same variable name as used in frontend
  // destructuring
  const { email, password } = req.body;
  const authUser = await Users.findOne({ where: { email: email } });
  
  if (!authUser) {
    res.send({ message: "Failed" });
  } else if (authUser.password !== password) {
    res.send({ message: "Failed" });
  } else {
    const accessToken = generateAccessToken(authUser);
    console.table(req.session);
    res.json({
      id: authUser.id,
      email: authUser.email,
      firstname: authUser.firstname,
      lastname: authUser.lastname,
      accessToken,
      auth: true,
    });
  }
});


routes.get("/loginUser", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, email: req.session.email });
  } else {
    res.send({ loggedIn: false });
  }
});


const verify = (req, res, next) => {
  // destructuring
  const token = req.headers["x-access-token"];
  if (token){
    jwt.verify(token, "mysecretkey", (err) => {
      if (err) {
        res.json({ auth: false, message: "not authorised" });
      } else {
        req.usersId = jwt.decode.id;
        next();
      }
    });
  }
};

routes.get("/getToken", verify, (req, res) => {
  console.log(req.headers);
  res.json({ auth: true, sessionData: true, email: req.headers.email });
});

module.exports = routes;
