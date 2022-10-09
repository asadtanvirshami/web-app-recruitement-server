const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
const db = require("./models");
const session = require("express-session")

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors({
  origin: ["https://web-app-recruitment-3kush0d16-asadtanvirshami.vercel.app"] ,
  //origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE","UPDATE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(session({
  key: "userID",
  secret: "loggedUser",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(express.urlencoded({ extended: true }));


db.sequelize.sync();

app.get("/", (req, res) => { res.json('Welcome to web application Server') });

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/entries", entryRoutes);



var PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening on port` + PORT);
  console.log('Press Ctrl+C to quit.');
});