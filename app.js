const express = require("express");

const logger = require('morgan');
const methodOverride = require('method-override');

const cohortRouter = require('./routes/cohort');

const app = express();


app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.set('views', "views")
app.set("view engine", "ejs");


app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method
      return method;
    }
  })
);


app.use('/cohorts', cohortRouter);
const PORT = 4000
const DOMAIN ="localhost"

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening at http://${DOMAIN}:${PORT}`);
})