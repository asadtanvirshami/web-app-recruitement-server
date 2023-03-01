const routes = require("express").Router();
const { Op }= require("sequelize");
const nodemailer = require("nodemailer");

const { Consultants} = require("../../models")
const{Users, History} = require("../../functions/associations/historyAssociations")

routes.post("/createConsultants", async (req, res) => {
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
   const ConsultantsInfo = await Consultants.create({
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

routes.post("/updateConsultants", async (req, res) => {
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
   const ConsultantsInfo = await Consultants.update(
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
    res.send([ConsultantsInfo])
  } catch (error) {
    console.log(); // fields contains extra meta data about results, if available
    res.send(error);
  }
});

routes.get("/getListOfConsultants", async (req, res) => {

  const ConsultantsInfo = await Consultants.findAndCountAll({
    offset: 0,
    limit: 10
  });
  if (ConsultantsInfo === null) {
    console.log('Not found!');
  } else {
    res.send(ConsultantsInfo); // true
  }
});

routes.get("/getListOfConsultantsPaginate", async (req, res) => {
try{
  const offset = parseInt(req.headers.offset)||0;
  const limit = parseInt(req.headers.limit)||10;
  
  const ConsultantsInfo = await Consultants.findAndCountAll({
    offset:offset,
    limit:limit
  });

  const results = {};

  results.next = {
    offset: offset + 1,
    limit: limit,
  };
  results.previous = {
    offset: offset - 1,
    limit: limit,
  };
  
  results.total = ConsultantsInfo.count;
  results.ConsultantsInfo = ConsultantsInfo.rows

  if (ConsultantsInfo === null) {
    console.log('Not found!');
  } else {
    res.send([results]); // true
  }

} catch(e){
  console.log(e)
}
});

routes.post("/filterConsultantsList", async (req, res) => {
  console.log(req.body)
try{
  const ConsultantsInfo = await Consultants.findAll({
    where:{
      category:{[Op.substring]: `%${req.body.category.toLowerCase().toUpperCase()}%`},
      name:{[Op.substring]: `%${req.body.name.toLowerCase().toUpperCase()}%`},
      email:{[Op.substring]: `%${req.body.email.toLowerCase().toUpperCase()}%`},
      security_clearence:{[Op.substring]: `%${req.body.sc.toLowerCase().toUpperCase()}%`},
    }
  }); 
  if (ConsultantsInfo === null) {
    console.log('Not found!');
  } else {
    res.send(ConsultantsInfo).status(200)
  } }catch(e){
    console.log(e)
  }
})

routes.delete("/deleteConsultant", async (req, res)  => {
  const id = req.headers.id;
  try{
  const deleteConsultant = await Consultants.destroy({where: { id:`${id}`,},force: true})
  res.send([deleteConsultant])
  }catch(e){
    console.log(e)
  }
})

routes.post("/sendMail", async (req, res)   => {
  console.log('body',req.body)

    var promises = (req.body).map((rqBody)=>{
      return History.create({
        sent_day:rqBody.sent_day,
        sent_date:rqBody.sent_date,
        ConsultantId:rqBody.id,
        UserId:rqBody.userId,
      })
    })
    try {
        const result = await Promise.all(promises)
        res.send(result);
    
    
 
    // const SaveInHistory = History.create(
    //   {
    //     sent_date:sent_date,
    //     sent_day:sent_day,
    //     ConsultantId: id,
    //     UserId: userId
    //   })
    // res.sendStatus(200)

  // let transporter = nodemailer.createTransport({
  //   // host: "smtp-relay.sendinblue.com",
  //   host: "",
  //   port: 25,
  //   secure: false,
  //   auth: {
  //     user: '', 
  //     pass: '',
  //   },
  // })
  // let info = await transporter.sendMail({
  //   from: `"${senderName}" <${emailSentBy}>`,
  //   to: `${email}`,
  //   subject: `${subject}`, 
  //   html: `${txt_body}`, 
  // });
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // } else{
  //   console.log('not send')
  
} catch (error) {
  res.send(error);
 }
})

routes.get("/getMailHistory", async (req, res) => {
  try{
      const offset = parseInt(req.headers.offset)||0;
      const limit = parseInt(req.headers.limit)||10;
      
      const mailHistory = await History.findAndCountAll({
        offset:offset,
        limit:limit,
        includes:[
          {model:Users},
        ]
      });
    
      const results = {};
    
      results.next = {
        offset: offset + 1,
        limit: limit,
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


routes.post("/updateNotification", async (req, res)   => {
  const id = req.body.id
  console.log(id)
  const status = false
  try {
    const EntriesData = await Entries.update( {show_notification:false}, {where:{ id: `${id}`}});
     res.status(200).send(EntriesData)
   } catch (error) {
     res.send(error);
   }
})

module.exports = routes;

// routes.get("/getListMailBySearch", async (req, res) => {
//  let searchRecord = req.headers.searchkeyword
//   console.log(req.headers.searchkeyword)
//   const response = await Entries.findAll({
//   where:{[Op.or]: [ {firstname:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
//                     {lastname:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
//                     {field:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
//                     {region:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
//                     {city:{[Op.substring]:`${searchRecord.toLowerCase().toUpperCase()}`}},
//                   ],}}) 
//   res.send([response])
// });