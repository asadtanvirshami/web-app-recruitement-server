const routes = require("express").Router();
const { Entries } = require("../../models")
const { Op }= require("sequelize");
const nodemailer = require("nodemailer");
const Sib = require('sib-api-v3-sdk')

routes.post("/createEntries", async (req, res) => {
  console.log(req.body)
  // using same variable name as used in frontend
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const linkedIn = req.body.linkedIn;
  const phone = req.body.phone;
  const field = req.body.field;
  const experience = req.body.experience;
  const region = req.body.region;
  const city = req.body.city;
  const security_clearence = req.body.sc;
  const comments = req.body.comments;
  const source = req.body.source;
  const source_link = req.body.source_link;
  const resources = req.body.resources;

  // we set if else statement to check if email exists or not or the space is empty
  try {
   const EntriesData = await Entries.create({
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        email: `${email}`,
        linkedIn: `${linkedIn}`,
        phone: `${phone}`,
        field: `${field}`,
        city: `${city}`,
        security_clearence: `${security_clearence}`,
        experience: `${experience}`,
        region: `${region}`,
        source:`${source}`,
        source_link:`${source_link}`,
        resources:`${resources}`,
        comments:`${comments}`,
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
  const city = req.body.city;
  const security_clearence = req.body.sc;
  const comments = req.body.comments;
  const source = req.body.source;
  const source_link = req.body.source_link;
  const resources = req.body.resources;

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
      city: `${city}`,
      security_clearence: `${security_clearence}`,
      experience: `${experience}`,
      region: `${region}`,
      source:`${source}`,
      source_link:`${source_link}`,
      resources:`${resources}`,
      comments:`${comments}`,
    }, 
    {where:{ id: `${id}` }});
    res.send([EntriesData])
  } catch (error) {
    console.log(); // fields contains extra meta data about results, if available
    res.send(error);
  }
});

routes.get("/getListMail", async (req, res) => {

  const List = await Entries.findAll();
  if (List === null) {
    console.log('Not found!');
  } else {
    res.send([List]); // true
  }
});

routes.get("/getListMailBySearch", async (req, res) => {
 let searchRecord = req.headers.searchkeyword
  console.log(req.headers.searchkeyword)
  const response = await Entries.findAll({
  where:{[Op.or]: [ {firstname:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
                    {lastname:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
                    {field:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
                    {region:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
                    {city:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
                  ],}}) 
  res.send([response])
});

routes.get("/getListSentMail", async (req, res)  => {
  const List = await Entries.findAll({where: {show_notification:true},force: true})
  res.send([List])
})

routes.delete("/deleteEntry", async (req, res)  => {
  const id = req.headers.id;
  const deleteEntry = await Entries.destroy({where: { id:`${id}`,},force: true})
  res.send([deleteEntry])
})

routes.post("/sendMail", async (req, res)   => {
  console.log('body',req.body)

    const id = req.body.id
    const email = req.body.email
    const sent_day = req.body.sent_day;
    const sent_date = req.body.sent_date;
    const subject = req.body.subject;
    const txt_body = req.body.txt_body
    const senderEmail = req.body.sender
    const emailSentBy = req.body.emailSentBy
    
  if(emailSentBy.includes('@gmail.com') && senderEmail !=null ){
  const EntriesData = await Entries.update( {status: "Sent", sent_day:`${sent_day}`,sent_date:`${sent_date}`,show_notification:true}, {where:{ id: `${id}` }});
  res.send([EntriesData]) } 
  else{
    console.log('not send')
  }

  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secureConnection: false, 
    secure: false,
    auth: {
      user: 'asadtanvir20@gmail.com', 
      pass: 'xsmtpsib-22dbee49663c23dee89e63c8716e5ec0b3cc311ba70b70e535ed20ce5e44f741-BFIWkcjs9HgZmzNT',
    },
  });
  if(emailSentBy.includes('@gmail.com') && senderEmail !=null ){
  // send mail with defined transport object
  let info = await transporter.sendMail({
    // from: '"Fred Foo" <atherq16@gmail.com>', // sender address
    from: `"${senderEmail}" <${emailSentBy}>`, // sender address
    to: `${email}`, // list of receivers
    subject: `${subject}`, // Subject line
    html: `${txt_body}`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } else{
    console.log('not send')
  }
})

routes.post("/updateNotification", async (req, res)   => {
    const id = req.body.id
    console.log(id)
    const status = false
    try {
      const EntriesData = await Entries.update( {show_notification:false}, {where:{ id: `${id}`}});
       res.send([EntriesData])
     } catch (error) {
       console.log(); // fields contains extra meta data about results, if available
       res.send(error);
     }
})



module.exports = routes;
