const routes = require("express").Router();
const { Entries} = require("../../models")
const { Op }= require("sequelize");
const nodemailer = require("nodemailer");

routes.post("/createEntries", async (req, res) => {
  console.log(req.body.data)
  // using same variable name as used in frontend
  const firstname = req.body.data.firstname;
  const lastname = req.body.data.lastname;
  const email = req.body.data.email;
  const phone = req.body.data.phone;
  const field = req.body.data.field;
  const experience = req.body.data.experience;
  const region = req.body.data.region;
  const city = req.body.data.city;
  const security_clearence = req.body.data.security_clearence;
  const comments = req.body.data.comments;
  const source = req.body.data.source;
  const source_link = req.body.data.source_link;
  const resources = req.body.data.resources;

  // we set if else statement to check if email exists or not or the space is empty
  try {
   const EntriesData = await Entries.create({
        name: `${firstname}` +" "+ `${lastname}`,
        email: `${email}`,
        phone: `${phone}`,
        category: `${field}`,
        city: `${city}`,
        security_clearence: `${security_clearence}`,
        experience: `${experience}`,
        region: `${region}`,
        source:`${source}`,
        source_link:`${source_link}`,
        resource:`${resources}`,
        comments:`${comments}`,
    })
    res.send({message:"Success"})
  } catch (error) {
    console.log(); // fields contains extra meta data about results, if available
    res.send(error);
  }
});

routes.post("/updateEntries", async (req, res) => {
  console.log(req.body)
  // using same variable name as used in frontend
  const id = req.body.data.id
  const name = req.body.data.name
  const email = req.body.data.email;
  const linkedIn = req.body.data.linkedIn;
  const phone = req.body.data.phone;
  const field = req.body.data.field;
  const experience = req.body.data.experience;
  const region = req.body.data.region;
  const city = req.body.data.city;
  const security_clearence = req.body.data.security_clearence;
  const comments = req.body.data.comments;
  const source = req.body.data.source;
  const source_link = req.body.data.source_link;
  const resources = req.body.data.resources;

  // we set if else statement to check if email exists or not or the space is empty
  try {
   const EntriesData = await Entries.update(
    {
      name:`${name}`,
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

  const List = await Entries.findAndCountAll({
    offset: 0,
    limit: 10
  });
  if (List === null) {
    console.log('Not found!');
  } else {
    res.json(List); // true
  }
});

routes.get("/getListMailPaginate", async (req, res) => {

  const List = await Entries.findAll();
  const offset = parseInt(req.headers.offset);
  const limit = parseInt(req.headers.limit);

  const startIndex = (offset - 1) * limit;
  const endIndex = offset * limit;

  const results = {};
  results.next = {
    offset: offset + 1,
    limit: limit,
  };
  results.previous = {
    offset: offset - 1,
    limit: limit,
  };

  results.List = List.slice(startIndex, endIndex);
  if (List === null) {
    console.log('Not found!');
  } else {
    res.send([results]); // true
  }
});

routes.post("/filterListMail", async (req, res) => {
try{
  const List = await Entries.findAll({
    where:{
      category:{[Op.substring]: `%${req.body.category.toLowerCase().toUpperCase()}%`},
      name:{[Op.substring]: `%${req.body.name.toLowerCase().toUpperCase()}%`},
      email:{[Op.substring]: `%${req.body.email.toLowerCase().toUpperCase()}%`},
      security_clearence:{[Op.substring]: `%${req.body.sc.toLowerCase().toUpperCase()}%`},
    }
  }); 
  if (List === null) {
    console.log('Not found!');
  } else {
    res.send(List); //true
  } }catch(e){
    console.log(e)
  }
})

routes.get("/getOptionSets", async (req, res)=>{
try{
  const [ data ] = await Promise.all([
    Resources.findAll(), 
    Experience.findAll(),
    Fields.findAll(),
    Sources.findAll(),
    City.findAll(),
    Region.findAll(),
    SecurityClearence.findAll()
  ]).then((r)=>{
    res.send(r)
  })
} catch(e) {
  console.log('none')
}
})

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
    
  if(emailSentBy.includes('@invisorsoft.ca') && senderEmail !=null ){
  const EntriesData = await Entries.update( {status: "Sent", sent_day:`${sent_day}`,sent_date:`${sent_date}`,show_notification:true}, {where:{ id: `${id}` }});
  res.send([EntriesData]) } 
  else{
    console.log('not send')
  }

  let transporter = nodemailer.createTransport({
    // host: "smtp-relay.sendinblue.com",
    host: "mail.invisorsoft.ca",
    port: 25,
    secure: false,
    auth: {
      user: 'info@invisorsoft.ca', 
      pass: 'Canada@0214',
    },
  });
  if(emailSentBy.includes( '@invisorsoft.ca') && senderEmail !=null ){

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
