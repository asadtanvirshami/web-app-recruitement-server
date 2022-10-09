const routes = require("express").Router();
const { Entries } = require("../../models")
const Sib = require('sib-api-v3-sdk')

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

routes.post("/updateEntries", async (req, res) => {
  // using same variable name as used in frontend
  const id = req.body.id
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
   const EntriesData = await Entries.update(
    {
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        email: `${email}`,
        linkedIn: `${linkedIn}`,
        phone: `${phone}`,
        field: `${field}`,
        experience: `${experience}`,
        region: `${region}`
    }, 
    {where:{ id: `${id}` }});
    res.send([EntriesData])
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

routes.delete("/deleteEntry", async (req, res)  => {
  const id = req.headers.id;
  const deleteEntry = await Entries.destroy({
    where: {
      id:`${id}`,
    },
    force: true
  })
    res.send([deleteEntry])
})

routes.post("/sendMail", (req, res)  => {
  console.log(req.body)
  const email = req.body.email
  const field = req.body.field
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = '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';
    const transEmailApi = new Sib.TransactionalEmailsApi();

    const sender = { email:'asadworkemail@gmail.com', name:'asad tanvir shami' }
    const recievers = [ { email:email, }, ];

    transEmailApi.sendTransacEmail({
      sender,
      to: recievers,
      subject:'Welcome to Innovatory',
      //textContent:'Wishing you a warm welcome to Hail Technologies',
      htmlContent:`
      <p>We have an on going recruitment in Canada.</p>
      <p>We are glad to tell you that you are selected for the interview at our company.</p>
      <p >As we are hiring {{params.field}} in our company</p>
      <br/>
      <p>We will send you the timing within this week.</p>
      <br/>
      <p>Regards</p>
      <p>Recruitment Team</p>
      `,
      params:{
        email:email,
        field:field
      },
    }).then((x)=>console.log(x))
    .catch((e)=>console.log(e));
    res.send(200);
})



module.exports = routes;
