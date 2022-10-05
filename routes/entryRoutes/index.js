const routes = require("express").Router();
const { Entries } = require("../../models");
const cors = require("cors");
routes.use(cors());
routes.use(
  cors({
    origin: ["https://web-app-recruitment-nds4hy31h-asadtanvirshami.vercel.app"],
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "UPDATE"],
    credentials: true,
  })
);

routes.post("/createEntries", async (req, res) => {
  // using same variable name as used in frontend
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const linkedIn = req.body.linkedIn;
  const phone = req.body.phone;
  const field = req.body.field;
  const experience = req.body.experience;
  const region = req.body.region;

  // we set if else statement to check if email exists or not or the space is empty
  try {
   const EntriesData = await Entries.create({
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        email: `${email}`,
        linkedIn: `${linkedIn}`,
        phone: `${phone}`,
        field: `${field}`,
        experience: `${experience}`,
        region: `${region}`
    })
    res.send({message:"Success"})
  } catch (error) {
    console.log(); // fields contains extra meta data about results, if available
    res.send(error);
  }
});

routes.post("/getListMail", async (req, res) => {
  const region = req.body.region
  const category = req.body.category

  const List = await Entries.findAll({ where: { field:`${category}`, region:`${region}` } });
  if (List === null) {
    console.log('Not found!');
  } else {
    res.send([List]); // true
  }
});


module.exports = routes;
